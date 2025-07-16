const express = require("express");
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

const products = [
  {
    id: 1,
    title: "Advanced AI Research Platform",
    description: "Comprehensive suite for AI model development and deployment.",
    price: 9999,
    image: "https://placehold.co/400x250/3498db/ffffff?text=AI+Platform",
    category: "Software",
  },
  {
    id: 2,
    title: "Secure Data Encryption Module",
    description: "Robust hardware-software solution for data security.",
    price: 4999,
    image: "https://placehold.co/400x250/2ecc71/ffffff?text=Encryption+Module",
    category: "Hardware",
  },
  {
    id: 3,
    title: "Drone Surveillance System Mk-II",
    description: "Next-gen drone with enhanced aerial monitoring capabilities.",
    price: 15000,
    image: "https://placehold.co/400x250/e74c3c/ffffff?text=Drone+System",
    category: "Hardware",
  },
  {
    id: 4,
    title: "Quantum Cryptography Toolkit",
    description:
      "Experimental kit for exploring post-quantum secure communications.",
    price: 7500,
    image: "https://placehold.co/400x250/9b59b6/ffffff?text=Quantum+Kit",
    category: "Research",
  },
  {
    id: 5,
    title: "Bio-Sensor Array for Environmental Monitoring",
    description: "Compact sensor for real-time environmental data collection.",
    price: 3500,
    image: "https://placehold.co/400x250/f39c12/ffffff?text=Bio-Sensor",
    category: "Sensors",
  },
];

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "No cart items provided." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      customer_email: req.user?.email || undefined,
      metadata: {
        productIds: cartItems.map((item) => item.id).join(","),
      },
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const productIds = session.metadata?.productIds?.split(",") || [];
    const email = session.customer_details?.email || "no-email";
    const amount = session.amount_total / 100;
    const currency = session.currency;

    try {
      const purchasedProducts = [];

      for (const id of productIds) {
        const product = products.find((p) => p.id.toString() === id);

        if (product) {
          await Payment.create({
            email,
            amount: product.price,
            currency,
            payment_status: session.payment_status,
            stripeId: session.id,
            productId: id,
            productTitle: product.title,
            productDescription: product.description,
            productCategory: product.category,
            productImage: product.image,
          });

          purchasedProducts.push(product);
        }
      }

      const productListHtml = purchasedProducts
        .map(
          (product) => `
        <li>
          <strong>${product.title}</strong> - ₹${product.price}
        </li>`
        )
        .join("");

      const subject = `🛒 New Cart Purchase (${purchasedProducts.length} item${
        purchasedProducts.length > 1 ? "s" : ""
      })`;

      const html = `
      <h2>New Purchase from ${email}</h2>
      <p><strong>Total Amount:</strong> ₹${amount} ${currency.toUpperCase()}</p>
      <p><strong>Payment ID:</strong> ${session.id}</p>
      <ul>${productListHtml}</ul>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject,
        html,
      });

      const userSubject = `🎉 Thank you for your purchase from ABC`;

      const userProductList = purchasedProducts
        .map(
          (product) => `
    <li>
      <strong>${product.title}</strong><br/>
      Category: ${product.category}<br/>
      Price: ₹${product.price}<br/>
      Description: ${product.description}
    </li>`
        )
        .join("");

      const userHtml = `
  <h2>Purchase Confirmation</h2>
  <p>Hi there,</p>
  <p>Thank you for your purchase. Here are the details of your order:</p>
  <ul>${userProductList}</ul>
  <p><strong>Total Amount Paid:</strong> ₹${amount} ${currency.toUpperCase()}</p>
  <p><strong>Payment ID:</strong> ${session.id}</p>
  <br/>
  <p>We hope you enjoy using our products!<br/>If you have any questions, feel free to reach out.</p>
  <p>Best regards,<br/>ABC Team</p>
`;

      await sendEmail({
        to: email,
        subject: userSubject,
        html: userHtml,
      });

      console.log("Payment saved & emails sent to admin and user");
    } catch (err) {
      console.error(" Webhook Error:", err.message);
    }
  }

  res.status(200).send("Webhook received");
};

module.exports = {
  router,
  webhookHandler,
};

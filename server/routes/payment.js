const express = require("express");
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// Dummy Products
const products = [
  { id: 1, title: "Tensorgo AI Plan", price: 999, image: "..." },
  { id: 2, title: "Monthly Access", price: 299, image: "..." },
];

// Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  const { productId } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(400).json({ error: "Invalid product" });

  try {
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "inr",
    //         product_data: {
    //           name: product.title,
    //         },
    //         unit_amount: product.price * 100,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   // customer_email: req.user?.email,
    //   customer_email: req.user?.email || "guest@example.com",

    //   metadata: {
    //     productId: productId.toString(), // include product ID for later tracking
    //   },
    //   success_url: `${process.env.FRONTEND_URL}/success`,
    //   cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    // });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: req.user?.email,
      metadata: {
        productId: product.id.toString(), // 👈 this gets saved in webhook
      },
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

// Webhook Handler (export separately)
// const webhookHandler = async (req, res) => {
//   console.log(" Webhook hit");

//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(" Webhook signature error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // FIX: Get the real email
//     const email =
//       session.customer_email || session.customer_details?.email || "no-email";

//     try {
//       const saved = await Payment.create({
//         email: email,
//         amount: session.amount_total / 100,
//         currency: session.currency,
//         payment_status: session.payment_status,
//         stripeId: session.id,
//         productId: session.metadata?.productId || null,
//       });

//       console.log(" Payment saved to DB:", saved);
//     } catch (err) {
//       console.error(" DB Save Error:", err.message);
//     }
//   }

//   res.status(200).send("Webhook received");
// };

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
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const productId = session.metadata?.productId;
    const product = products.find((p) => p.id.toString() === productId);

    const email = session.customer_details?.email || "no-email";
    const amount = session.amount_total / 100;
    const currency = session.currency;

    try {
      // Save to DB
      const saved = await Payment.create({
        email,
        amount,
        currency,
        payment_status: session.payment_status,
        stripeId: session.id,
        productId,
        productTitle: product?.title || "Unknown Product",
      });

      // Send Email to Admin
      const subject = `🛒 New Purchase: ${product?.title}`;
      const html = `
        <h2>New Product Purchased</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product?.title} (ID: ${productId})</p>
        <p><strong>Amount:</strong> ₹${amount} ${currency.toUpperCase()}</p>
        <p><strong>Time:</strong> ${new Date(saved.createdAt).toLocaleString()}</p>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject,
        html,
      });

      console.log("✅ Payment saved & email sent to admin");
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  }

  res.status(200).send("Webhook received");
};


module.exports = {
  router,
  webhookHandler, // export separately for raw handler
};

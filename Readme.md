# 🛒 ABC Tech Product Store

A full-featured web application for browsing, purchasing, and managing innovative technology products using a secure Stripe payment integration and admin dashboard.

## 🚀 Features

### 🧑‍💻 User Features

* Browse cutting-edge tech products (AI platforms, hardware, sensors, etc.)
* Add multiple products to cart
* Secure checkout via Stripe
* Payment confirmation email to user
* View order success and cancellation pages
* Responsive design

### 🛠️ Admin Features

* Admin login via authorized email
* View all successful payments with product details
* Dashboard includes:

  * User email
  * Purchased products (title, category, description)
  * Payment status
  * Timestamp

### 📧 Email Notifications

* Admin receives email for every completed purchase (single or multiple items)
* User receives email confirmation with:

  * List of purchased products
  * Amount paid
  * Category and description
  * Timestamp

---

## 🧰 Tech Stack

| Frontend         | Backend                 | Database           | Other Tools                     |
| ---------------- | ----------------------- | ------------------ | ------------------------------- |
| React + Vite     | Node.js + Express.js    | MongoDB + Mongoose | Stripe API (Checkout + Webhook) |
| Tailwind CSS     | JWT for auth (optional) |                    | Nodemailer for emails           |
| React Router DOM | CORS, dotenv            |                    | PM2 (for local production)      |

---

## 📦 Folder Structure

```
📁 client
 ├ 📂 components/
 ├ 📂 pages/
 ├ 📄 App.jsx
 └ 📄 main.jsx

📁 server
 ├ 📂 models/
 ├ 📂 routes/
 ├ 📂 utils/
 ├ 📄 index.js
 └ 📄 .env
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server` directory with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
ADMIN_EMAIL=admin@example.com
EMAIL_USER=your_gmail_or_smtp_email
EMAIL_PASS=your_email_password_or_app_password
```

---

## 💳 Stripe Setup

1. Create a [Stripe](https://stripe.com) account
2. Create a product and use the test keys
3. Use Stripe CLI to test webhook:

```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```

---

## ✅ Getting Started

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

### 💻 Backend

```bash
cd server
npm install
npm run dev
```

---

## 📸 Screenshots

> Add these if available:

* Home page with product grid
* Cart page with items
* Checkout process
* Admin dashboard with payments table
* Confirmation email sample

---

## 🧪 Future Enhancements

* PDF invoice generation
* User order history
* Admin authentication via JWT
* Product management via admin panel

---

## 🙌 Acknowledgements

* [Stripe API](https://stripe.com/docs)
* [Nodemailer](https://nodemailer.com/about/)
* [React + Vite](https://vitejs.dev/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📧 Contact

**Anurag Prajapati**
📩 [anuragprajapati02005@gmail.com](mailto:anuragprajapati02005@gmail.com)
🌐 [GitHub](https://github.com/Anurag915) | [Portfolio](#) | [LinkedIn](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

require("dotenv").config(); // Must be first
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");

const app = express();

//  Stripe Webhook: raw body ONLY for webhook
// If using Express 4.16.0+ you can use express.raw directly
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }), // Using express.raw
  require("./routes/payment").webhookHandler
);

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Other middleware
app.use(cookieParser());
app.use(express.json());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

//  MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//  Auth + Payment Routes (excluding webhook)
app.use("/auth", authRoutes);
app.use("/api/payment", paymentRoutes.router); // exclude .webhookHandler
app.use("/api/admin", adminRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Welcome to the OAuth Demo");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});

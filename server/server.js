require("dotenv").config(); 
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

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }), 
  require("./routes/payment").webhookHandler
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

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

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/auth", authRoutes);
app.use("/api/payment", paymentRoutes.router); 
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the OAuth Demo");
});

app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});

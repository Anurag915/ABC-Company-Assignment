const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.email === "122cs0031@iiitk.ac.in") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

router.get("/payments", isAdmin, async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

module.exports = router;

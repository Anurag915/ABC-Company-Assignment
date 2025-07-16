const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:5173/",
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.get("/current-user", (req, res) => {
  console.log("User from session:", req.user); // Debug
  res.send(req.user || null);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Home Route
router.get("/", (req, res) => {
    res.render("home"); 
  });
  
// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({ username: req.body.username, password: hashedPassword });
  res.redirect("/login");
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/login",
}));

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO_URI) // No need for deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

  

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? done(null, user) : done(null, false, { message: "Incorrect password" });
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

  // Routes
  app.use("/", require("./routes/auth"));
  app.use("/notes", require("./routes/notes"));
  
    // Error Handling Middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render("error", { errorMessage: err.message });
      });
      
app.listen(3000, () => console.log("Server running on port 3000"));

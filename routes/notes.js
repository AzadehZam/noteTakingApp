const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Fetch all notes
router.get("/", isAuthenticated, async (req, res) => {
    try {
        //throw new Error("This is a test error!"); // Simulate an error
        const notes = await Note.find({ user: req.user.id });
        res.render("notes", { notes, user: req.user });
    } catch (error) {
        res.status(500).render("error", { errorMessage: "Error fetching notes. Please try again later." });
    }
});

// POST a new note (Create)
router.post("/", isAuthenticated, async (req, res, next) => {
    try {
      // Ensure title and content are provided
      if (!req.body.title || !req.body.content) {
        throw new Error("Title and content are required.");
      }
  
      await Note.create({ 
        title: req.body.title, 
        content: req.body.content, 
        user: req.user.id 
      });
  
      res.redirect("/notes");
    } catch (err) {
      next(err); // Pass error to the error-handling middleware
    }
  });  

// Show edit form
router.get("/edit/:id", isAuthenticated, async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) return res.status(404).send("Note not found");
      res.render("edit", { note });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading edit page");
    }
  });
  
  // Update note
  router.post("/edit/:id", isAuthenticated, async (req, res) => {
    try {
      await Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
      });
      res.redirect("/notes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating note");
    }
  });
  
// Delete a note
router.post("/delete/:id", isAuthenticated, async (req, res) => {
    try {
        console.log("Deleting note with ID:", req.params.id);

        const note = await Note.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Note not found");
        }
        await Note.findByIdAndDelete(req.params.id);
        
      res.redirect("/notes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting note");
    }
  });
  

module.exports = router;
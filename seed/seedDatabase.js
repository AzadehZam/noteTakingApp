require('dotenv').config();

const mongoose = require('mongoose');
const Note = require("../models/Note");


async function seedNotes() {

    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    try {
        // Delete existing data
        await Note.deleteMany({});
        
        // Fake note data
        const notes = [
            {
                user: "user123", // Replace with an actual user ID or username
                title: "Meeting Notes",
                content: "Discussed project deadlines and upcoming milestones.",
                createdAt: new Date()
            },
            {
                user: "user123",
                title: "Shopping List",
                content: "Milk, Eggs, Bread, Coffee",
                createdAt: new Date()
            },
            {
                user: "user456",
                title: "Ideas for New App",
                content: "A productivity app that helps users track daily habits.",
                createdAt: new Date()
            }
        ];

        await Note.insertMany(notes);

        console.log('Database seeded');
    }
    catch (err) {
        console.error('Error seeding database:', err);
    }
    finally {
        mongoose.connection.close();
    }
}

seedNotes();
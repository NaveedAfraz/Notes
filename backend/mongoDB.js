// db.js
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://NaveedAfraz:0507452401nn@cluster0.uyn2n.mongodb.net/notes";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    
  }
};

module.exports = connectToDatabase;

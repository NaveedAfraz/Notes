// db.js;
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const path = require("path");

const MONGO_URI = process.env.MONGODB_URI;
// console.log(process.env.MONGODB_URI);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};

module.exports = connectToDatabase;

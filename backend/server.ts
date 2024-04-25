const dotenv = require("dotenv").config();
import app from "./app"
import mongoose from 'mongoose';
import path from 'path'
import cors from 'cors'
const express = require("express");

app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.use(cors({
//   origin: ["http://localhost:5000", "https://LQApp2.onrender.com"]
// }));

// Load React App in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to the home page");
  });
}


// Now you can access environment variables via process.env
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Ensure that required environment variables are defined
if (!GOOGLE_BOOKS_API_KEY || !MONGODB_CONNECTION_STRING || !PORT || !SESSION_SECRET) {
  console.error('Missing one or more required environment variables.');
  process.exit(1); // Exit with error
}

// Mongo connection
mongoose.connect(MONGODB_CONNECTION_STRING, {  })
  .then(() => {
    console.log('MongoDB connected');

    // Start Express server after MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with error if MongoDB connection fails
  });

  
  
  
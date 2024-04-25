import app from "./app"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs'
import path from 'path'

const express = require('express')

app.use(express.static('./build'))

// Render client for any path
app.get('/', (req, res) => {
  const options = {
       root: path.join(__dirname, './build'),
       dotfiles: 'ignore',
       headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
       }
  };
  res.sendFile('index.html', options);

})

// debugging env file path
const envPath = path.resolve(__dirname, './.env')
if (fs.existsSync(envPath)) {
  console.log('.env file found at:', envPath);
} else {
  console.error('.env file not found at:', envPath);
}

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1); // Exit with error
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

  
  
  
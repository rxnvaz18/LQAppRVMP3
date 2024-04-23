import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import env from './util/validateEnv'; // Exports your environment variables
import fs from 'fs'
import path from 'path'

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


const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


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

export default app;

// // Define a Mongoose schema for the search results
// interface Book {
//     title: string;
//     description?: string;
//   }
  
//   interface SearchDocument extends Document {
//     query: string;
//     books: Book[];
//     timestamp: Date;
//   }
  
//   const searchSchema = new Schema({
//     query: String,
//     books: [{
//       title: String,
//       description: String,
//     }],
//     timestamp: { type: Date, default: Date.now }
//   });
  
//   // Create a Mongoose model based on the schema
//   const Search = model<SearchDocument>('Search', searchSchema);
  
//   app.get('/api/search', async (req, res) => {
//     const { query } = req.query;
  
//     try {
//       if (typeof query !== 'string') {
//         throw new Error('Invalid query parameter');
//       }
  
//       // Search books via Google Books API
//       const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
  
//       const books: Book[] = response.data.items.map((item: any) => ({
//         title: item.volumeInfo.title,
//         description: item.volumeInfo.description,
//       }));
  
//       // Use Mongoose model to save the search results
//       const newSearch = new Search({ query, books });
//       await newSearch.save();
  
//       res.json(books);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching books');
//     }
//   });
  
  
  
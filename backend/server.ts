import express, { json } from 'express';
import axios from 'axios';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors'; // Import CORS module

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

import { router as bookshelfRouter } from './controllers/bookShelf';
// Enable all CORS requests
app.use(cors());
app.use(json());
app.use('/api/novels/bookshelf', bookshelfRouter)

// MongoDB connection string
const uri = process.env.REACT_APP_MONGODB_URI!;

// Google Books API key
const apiKey = process.env.GOOGLE_BOOKS_API_KEY!;

// Connect to MongoDB
connect(uri)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for the search results
interface Book {
    title: string;
    description?: string;
  }
  
  interface SearchDocument extends Document {
    query: string;
    books: Book[];
    timestamp: Date;
  }
  
  const searchSchema = new Schema({
    query: String,
    books: [{
      title: String,
      description: String,
    }],
    timestamp: { type: Date, default: Date.now }
  });
  
  // Create a Mongoose model based on the schema
  const Search = model<SearchDocument>('Search', searchSchema);
  
  app.get('/api/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      if (typeof query !== 'string') {
        throw new Error('Invalid query parameter');
      }
  
      // Search books via Google Books API
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
  
      const books: Book[] = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
      }));
  
      // Use Mongoose model to save the search results
      const newSearch = new Search({ query, books });
      await newSearch.save();
  
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching books');
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
  export default app;
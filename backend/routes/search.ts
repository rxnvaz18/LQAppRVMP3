// Import necessary modules
import express, { Request, Response } from 'express';
import Search from '../models/Search';
import axios from 'axios';

// Create an Express router
const router = express.Router();

// Endpoint to search books via Google Books API
router.get('/search', async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    if (typeof query !== 'string') {
      throw new Error('Invalid query parameter');
    }

    // Search books via Google Books API
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);

    const books = response.data.items.map((item: any) => ({
      title: item.volumeInfo.title,
      description: item.volumeInfo.description || ''
    }));

    // Save the search results to MongoDB using the Search model
    const newSearch = new Search({ query: query as string, books });
    await newSearch.save();

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error fetching books');
  }
});

// Export the router
export default router;
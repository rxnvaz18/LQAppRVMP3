"use strict";
// import axios from 'axios'
// import { Schema, model } from 'mongoose'
// import app from "../app"
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
//   export const Search = model<SearchDocument>('Search', searchSchema);
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
//     const newSearch = new Search({ query, books });
//       await newSearch.save();
//       res.json(books);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching books');
//     }
//   });

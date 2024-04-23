"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors")); // Import CORS module
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookShelf_1 = require("./controllers/bookShelf");
dotenv_1.default.config();
// Enable all CORS requests
app_1.default.use((0, cors_1.default)());
app_1.default.use((0, express_1.json)());
app_1.default.use('/api/novels/bookshelf', bookShelf_1.router);
// environmental variables
const PORT = validateEnv_1.default.PORT || 5000;
// const apiKey = env.GOOGLE_BOOKS_API_KEY;
// const sessionSecret = env.SESSION_SECRET;
mongoose_1.default.connect(validateEnv_1.default.MONGODB_CONNECTION_STRING)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(PORT, () => {
        console.log("Server running on port: " + PORT);
    });
})
    .catch(console.error);
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
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors")); // Import CORS module
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const bookShelf_1 = require("./controllers/bookShelf");
// Enable all CORS requests
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use('/api/novels/bookshelf', bookShelf_1.router);
// MongoDB connection string
const uri = process.env.REACT_APP_MONGODB_URI;
// Google Books API key
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
// Connect to MongoDB
(0, mongoose_1.connect)(uri)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));
const searchSchema = new mongoose_1.Schema({
    query: String,
    books: [{
            title: String,
            description: String,
        }],
    timestamp: { type: Date, default: Date.now }
});
// Create a Mongoose model based on the schema
const Search = (0, mongoose_1.model)('Search', searchSchema);
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        if (typeof query !== 'string') {
            throw new Error('Invalid query parameter');
        }
        // Search books via Google Books API
        const response = yield axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
        const books = response.data.items.map((item) => ({
            title: item.volumeInfo.title,
            description: item.volumeInfo.description,
        }));
        // Use Mongoose model to save the search results
        const newSearch = new Search({ query, books });
        yield newSearch.save();
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching books');
    }
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;

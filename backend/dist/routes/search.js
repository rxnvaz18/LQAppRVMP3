"use strict";
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
// Import necessary modules
const express_1 = __importDefault(require("express"));
const Search_1 = __importDefault(require("../models/Search"));
const axios_1 = __importDefault(require("axios"));
// Create an Express router
const router = express_1.default.Router();
// Endpoint to search books via Google Books API
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        if (typeof query !== 'string') {
            throw new Error('Invalid query parameter');
        }
        // Search books via Google Books API
        const response = yield axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const books = response.data.items.map((item) => ({
            title: item.volumeInfo.title,
            description: item.volumeInfo.description || ''
        }));
        // Save the search results to MongoDB using the Search model
        const newSearch = new Search_1.default({ query: query, books });
        yield newSearch.save();
        res.json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
}));
// Export the router
exports.default = router;

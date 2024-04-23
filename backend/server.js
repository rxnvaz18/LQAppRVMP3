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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors")); // Import CORS module
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const mongoose_2 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT;
mongoose_2.default.connect(validateEnv_1.default.REACT_APP_MONGODB_URI)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
    .catch(console.error);
const bookShelf_1 = require("./controllers/bookShelf");
// Enable all CORS requests
app_1.default.use((0, cors_1.default)());
app_1.default.use((0, express_1.json)());
app_1.default.use('/api/novels/bookshelf', bookShelf_1.router);
// Google Books API key
const apiKey = validateEnv_1.default.GOOGLE_BOOKS_API_KEY;
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
app_1.default.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app_1.default.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

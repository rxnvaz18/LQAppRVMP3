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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// import env from './util/validateEnv'; // Exports your environment variables
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, './.env');
if (fs_1.default.existsSync(envPath)) {
    console.log('.env file found at:', envPath);
}
else {
    console.error('.env file not found at:', envPath);
}
const result = dotenv_1.default.config({ path: envPath });
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
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
mongoose_1.default.connect(MONGODB_CONNECTION_STRING, {})
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
exports.default = app;
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

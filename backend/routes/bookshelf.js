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
const express_1 = __importDefault(require("express"));
const Books_1 = __importDefault(require("../models/Books"));
const router = express_1.default.Router();
// Endpoint to add a book to the bookshelf
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image } = req.body;
    try {
        // Check if a book with the same title already exists
        const existingBook = yield Books_1.default.findOne({ title });
        if (existingBook) {
            return res.status(409).json({ message: 'Book already exists in the bookshelf' });
        }
        // If no existing book is found, proceed to add the new book
        const newBook = new Books_1.default({ title, description, image });
        yield newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error('Error adding book to bookshelf:', error);
        res.status(500).send('Error adding book to bookshelf');
    }
}));
// Endpoint to update the read status of a book
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { readStatus } = req.body;
    try {
        const updatedBook = yield Books_1.default.findByIdAndUpdate(id, { readStatus }, { new: true });
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(updatedBook);
    }
    catch (error) {
        console.error('Error updating book read status:', error);
        res.status(500).send('Error updating book read status');
    }
}));
// Endpoint to get all books in the bookshelf
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Books_1.default.find({});
        res.json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
}));
// Endpoint to delete a book from the bookshelf
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBook = yield Books_1.default.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(deletedBook);
    }
    catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
}));
exports.default = router;

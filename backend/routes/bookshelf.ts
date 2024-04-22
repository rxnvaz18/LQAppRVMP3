import express, { Request, Response } from 'express';
import Book, { Book as BookInterface } from '../models/Books';
import * as bookshelfController from "../controllers/bookShelf"

const router = express.Router();

// Endpoint to add a book to the bookshelf
router.post('/add', async (req: Request, res: Response) => {
    const { title, description, image }: BookInterface = req.body;

    try {
        // Check if a book with the same title already exists
        const existingBook = await Book.findOne({ title });

        if (existingBook) {
            return res.status(409).json({ message: 'Book already exists in the bookshelf' });
        }

        // If no existing book is found, proceed to add the new book
        const newBook = new Book({ title, description, image });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book to bookshelf:', error);
        res.status(500).send('Error adding book to bookshelf');
    }
});

// Endpoint to update the read status of a book
router.put('/update/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { readStatus }: Pick<BookInterface, 'readStatus'> = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { readStatus }, { new: true });
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book read status:', error);
        res.status(500).send('Error updating book read status');
    }
});

// Endpoint to get all books in the bookshelf
router.get('/all', async (req: Request, res: Response) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

// Endpoint to delete a book from the bookshelf
router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(deletedBook);
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

export default router
// // Bookshelf.js
// import Book from '../models/Books.js'; // Import the Book model
// export const router = express.Router();


// // Endpoint to add a book to the bookshelf
// router.post('/add', async (req, res) => {
//     const { title, description, image } = req.body; // Assuming 'title' can be used as a unique identifier

//     try {
//         // Check if a book with the same title already exists
//         const existingBook = await Book.findOne({ title });

//         if (existingBook) {
//             return res.status(409).json({ message: 'Book already exists in the bookshelf' });
//         }

//         // If no existing book is found, proceed to add the new book
//         const newBook = new Book({ title, description, image });
//         await newBook.save();
//         res.status(201).json(newBook);
//     } catch (error) {
//         console.error('Error adding book to bookshelf:', error);
//         res.status(500).send('Error adding book to bookshelf');
//     }
// });

// // Endpoint to update the read status of a book
// router.put('/update/:id', async (req, res) => {
//     const { id } = req.params;
//     const { readStatus } = req.body;

//     try {
//         const updatedBook = await Book.findByIdAndUpdate(id, { readStatus }, { new: true });
//         if (!updatedBook) {
//             return res.status(404).send('Book not found');
//         }
//         res.json(updatedBook);
//     } catch (error) {
//         console.error('Error updating book read status:', error);
//         res.status(500).send('Error updating book read status');
//     }
// });

// // Endpoint to get all books in the bookshelf
// router.get('/all', async (req, res) => {
//     try {
//         const books = await Book.find({});
//         res.json(books);
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).send('Error fetching books');
//     }
// });

// router.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedBook = await Book.findByIdAndDelete(id);
//         if (!deletedBook) {
//             return res.status(404).send('Book not found');
//         }
//         res.json(deletedBook);
//     } catch (error) {
//         console.error('Error deleting book:', error);
//         res.status(500).send('Error deleting book');
//     }
// })
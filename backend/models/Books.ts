import { Document, model, Schema } from 'mongoose';

// Define interface for Book
export interface Book {
  title: string;
  description?: string;
  image?: string;
  readStatus?: boolean;
}

// Define Mongoose schema for Book
const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  readStatus: { type: Boolean, default: false }
});

// Define and export Mongoose model for Book
export default model<Book>('Book', bookSchema);

// Define and export BookDocument type based on Mongoose Document
export type BookDocument = Document & Book;
// models/Book.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Book extends Document {
  title: string;
  description: string;
  image: string;
  readStatus: boolean;
}

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  readStatus: { type: Boolean, default: false }
});

export default mongoose.model<Book>('Book', bookSchema);
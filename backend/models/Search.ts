// Import necessary modules
import { Schema, model, Document } from 'mongoose';

// Define interface for Book document
interface Book {
  title: string;
  description?: string;
}

// Define interface for Search document
interface SearchDocument extends Document {
  query: string;
  books: Book[];
  timestamp: Date;
}

// Define Mongoose schema for Search
const searchSchema = new Schema<SearchDocument>({
  query: { type: String, required: true },
  books: [{
    title: { type: String, required: true },
    description: { type: String }
  }],
  timestamp: { type: Date, default: Date.now }
});

// Create a Mongoose model based on the schema
const Search = model<SearchDocument>('Search', searchSchema);

// Export the Search model
export default Search;
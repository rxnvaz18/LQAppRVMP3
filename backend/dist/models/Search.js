"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const mongoose_1 = require("mongoose");
// Define Mongoose schema for Search
const searchSchema = new mongoose_1.Schema({
    query: { type: String, required: true },
    books: [{
            title: { type: String, required: true },
            description: { type: String }
        }],
    timestamp: { type: Date, default: Date.now }
});
// Create a Mongoose model based on the schema
const Search = (0, mongoose_1.model)('Search', searchSchema);
// Export the Search model
exports.default = Search;

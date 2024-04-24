"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define Mongoose schema for Book
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    readStatus: { type: Boolean, default: false }
});
// Define and export Mongoose model for Book
exports.default = (0, mongoose_1.model)('Book', bookSchema);

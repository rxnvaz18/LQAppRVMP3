"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookShelf = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Novel", bookShelf);

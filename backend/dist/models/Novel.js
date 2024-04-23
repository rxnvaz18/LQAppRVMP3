"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const novelSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Novel", novelSchema);

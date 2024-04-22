"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const novels_1 = __importDefault(require("./routes/novels"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/novels", novels_1.default);
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error)
        errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});
exports.default = app;

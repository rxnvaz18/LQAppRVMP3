"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Users_1 = __importDefault(require("./routes/Users"));
const novels_1 = __importDefault(require("./routes/novels"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const bookShelf_1 = require("./controllers/bookShelf");
const search_1 = __importDefault(require("./routes/search"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middleware to parse json bodies
app.use(express_1.default.json());
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.static('./build'));
// Render client for any path
app.get('/', (req, res) => {
    const options = {
        root: path_1.default.join(__dirname, '../frontend/build'),
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('index.html', options, (err) => {
        console.log(err);
    });
});
// Configure session middleware
const sessionSecret = process.env.SESSION_SECRET; // Retrieve SESSION_SECRET from environment variables
if (!sessionSecret) {
    throw new Error('SESSION_SECRET is missing in environment variables');
}
app.use((0, express_session_1.default)({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // This is one hour
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING || '', // Provide a fallback value for MongoDB connection string
    })
}));
app.use("/api/users", Users_1.default);
app.use("/api/novels", authMiddleware_1.requiresAuth, novels_1.default);
app.use('/bookshelf', authMiddleware_1.requiresAuth, bookShelf_1.router);
app.use('/api/search', search_1.default);
// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(404).send(err.message || 'Not Found');
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Users_1 = __importDefault(require("./routes/Users"));
const novels_1 = __importDefault(require("./routes/novels"));
const bookshelf_1 = __importDefault(require("./routes/bookshelf"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, //This is one hour
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: validateEnv_1.default.REACT_APP_MONGODB_URI
    })
}));
app.use("/api/users", Users_1.default);
app.use("/api/novels", novels_1.default);
app.use("/api/bookshelf", bookshelf_1.default);
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

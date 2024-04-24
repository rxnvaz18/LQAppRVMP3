"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// debugging env file path
const envPath = path_1.default.resolve(__dirname, './.env');
if (fs_1.default.existsSync(envPath)) {
    console.log('.env file found at:', envPath);
}
else {
    console.error('.env file not found at:', envPath);
}
const result = dotenv_1.default.config({ path: envPath });
if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1); // Exit with error
}
// Now you can access environment variables via process.env
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;
// Ensure that required environment variables are defined
if (!GOOGLE_BOOKS_API_KEY || !MONGODB_CONNECTION_STRING || !PORT || !SESSION_SECRET) {
    console.error('Missing one or more required environment variables.');
    process.exit(1); // Exit with error
}
// Mongo connection
mongoose_1.default.connect(MONGODB_CONNECTION_STRING, {})
    .then(() => {
    console.log('MongoDB connected');
    // Start Express server after MongoDB connection is established
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with error if MongoDB connection fails
});

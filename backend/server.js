"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// APP SETUP
const app = (0, express_1.default)();
const port = 5000;
// ENDPOINTS
app.get("/", (req, res) => {
    res.send("I'm Awake");
});
// STARTING SERVER
app.listen(port, () => {
    console.log("Server running on port:" + port);
});

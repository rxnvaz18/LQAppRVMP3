"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
// APP SETUP
const port = process.env.PORT;
// MONGOOSE CONNECTION & STARTING SERVER
mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("Mongoose Connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port:" + port);
    });
})
    .catch(console.error);

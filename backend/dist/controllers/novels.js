"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNovel = exports.updateNovel = exports.createNovel = exports.getNovel = exports.getNovels = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Novel_1 = __importDefault(require("../models/Novel"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const http_errors_1 = __importDefault(require("http-errors"));
const getNovels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        const novels = yield Novel_1.default.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(novels);
    }
    catch (error) {
        next(error);
    }
});
exports.getNovels = getNovels;
const getNovel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const novelId = req.params.novelId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(novelId)) {
            throw Error("Invalid novel id");
        }
        const novel = yield Novel_1.default.findById(novelId).exec();
        if (!novel) {
            throw Error("novel review not found");
        }
        if (!novel.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this novel review");
        }
        res.status(200).json(novel);
    }
    catch (error) {
        next(error);
    }
});
exports.getNovel = getNovel;
const createNovel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!title) {
            throw (0, http_errors_1.default)(400, "review must have a title");
        }
        const newNovel = yield Novel_1.default.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });
        res.status(201).json(newNovel);
    }
    catch (error) {
        next(error);
    }
});
exports.createNovel = createNovel;
const updateNovel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const novelId = req.params.novelId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(novelId)) {
            throw Error("Invalid novel id");
        }
        if (!newTitle) {
            throw Error("review must have a title");
        }
        const novel = yield Novel_1.default.findById(novelId).exec();
        if (!novel) {
            throw Error("novel review not found");
        }
        if (!novel.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this novel review");
        }
        novel.title = newTitle;
        novel.text = newText;
        const updatedNovel = yield novel.save();
        res.status(200).json(updatedNovel);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNovel = updateNovel;
const deleteNovel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const novelId = req.params.novelId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(novelId)) {
            throw Error("Invalid novel id");
        }
        const novel = yield Novel_1.default.findById(novelId).exec();
        if (!novel) {
            throw Error("Novel review not found");
        }
        const deleteResult = yield Novel_1.default.deleteOne({ _id: novelId });
        if (deleteResult.deletedCount === 0) {
            throw (0, http_errors_1.default)(401, "Novel not found");
        }
        if (!novel.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this novel review");
        }
        yield novel.deleteOne();
        res.sendStatus(204); // Successfully deleted
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNovel = deleteNovel;

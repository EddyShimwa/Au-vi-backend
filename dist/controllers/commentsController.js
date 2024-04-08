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
exports.getAllComments = exports.createComment = void 0;
const handleTryAndCatch_1 = require("../Middleware/handleTryAndCatch");
const Comment_1 = __importDefault(require("../models/Comment"));
exports.createComment = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, user, blog } = req.body;
    const comment = yield Comment_1.default.create({ content, user, blog });
    res.status(201).json({ comment });
}));
exports.getAllComments = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const comments = yield Comment_1.default.find({ blog: blogId });
    res.status(200).json({ comments });
}));

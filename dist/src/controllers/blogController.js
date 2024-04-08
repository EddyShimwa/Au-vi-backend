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
exports.incrementLikes = exports.getAllBlogs = exports.editBlog = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const handleTryAndCatch_1 = require("../Middleware/handleTryAndCatch");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image } = req.body;
        const blog = yield Blog_1.default.create({ title, image, description, likesCount: 0 });
        res.status(201).json({ blog });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createBlog = createBlog;
const editBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = yield Blog_1.default.findById(id);
        if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
            return;
        }
        if (title)
            blog.title = title;
        if (description)
            blog.description = description;
        if (image)
            blog.image = image;
        yield blog.save();
        res.status(200).json({ blog });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editBlog = editBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find({});
        res.status(200).json({ blogs });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllBlogs = getAllBlogs;
exports.incrementLikes = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    const blog = yield Blog_1.default.findById(id);
    if (!blog) {
        res.status(404).json({ error: 'Blog not found' });
        return;
    }
    if (blog.likedBy.includes(userId)) {
        blog.likesCount -= 1;
        blog.likedBy = blog.likedBy.filter(id => id !== userId);
    }
    else {
        blog.likesCount += 1;
        blog.likedBy.push(userId);
    }
    yield blog.save();
    res.status(200).json({ blog });
}));

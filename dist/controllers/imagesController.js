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
exports.deleteImage = exports.incrementLikes = exports.getAllImages = exports.editImage = exports.createImage = void 0;
const Image_1 = __importDefault(require("../models/Image"));
const handleTryAndCatch_1 = require("../Middleware/handleTryAndCatch");
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image } = req.body;
        const newImage = yield Image_1.default.create({ title, image, likesCount: 0 });
        res.status(201).json({ newImage });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createImage = createImage;
const editImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, image } = req.body;
        const img = yield Image_1.default.findById(id);
        if (!img) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }
        if (title)
            img.title = title;
        if (image)
            img.image = image;
        yield img.save();
        res.status(200).json({ img });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editImage = editImage;
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield Image_1.default.find({});
        res.status(200).json({ images });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllImages = getAllImages;
exports.incrementLikes = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    const img = yield Image_1.default.findById(id);
    if (!img) {
        res.status(404).json({ error: 'Image not found' });
        return;
    }
    if (img.likedBy.includes(userId)) {
        img.likesCount -= 1;
        img.likedBy = img.likedBy.filter(id => id !== userId);
    }
    else {
        img.likesCount += 1;
        img.likedBy.push(userId);
    }
    yield img.save();
    res.status(200).json({ img });
}));
//delete an image by Id
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const img = yield Image_1.default.findById(id);
        if (!img) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }
        yield img.deleteOne();
        res.status(200).json({ message: 'Image deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteImage = deleteImage;

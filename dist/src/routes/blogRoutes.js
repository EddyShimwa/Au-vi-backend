"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.post('/blogs/createBlog', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, blogController_1.createBlog);
router.put('/blogs/editBlog/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, blogController_1.editBlog);
router.get('/blogs/all', blogController_1.getAllBlogs);
router.post('/blogs/incrementLikes/:id', authsMiddleware_1.isAuthenticated, blogController_1.incrementLikes);
exports.default = router;

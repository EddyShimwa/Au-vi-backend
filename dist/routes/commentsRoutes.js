"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = require("../controllers/commentsController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.post('/comments', authsMiddleware_1.isAuthenticated, commentsController_1.createComment);
router.get('/blogs/:blogId/comments', authsMiddleware_1.isAuthenticated, commentsController_1.getAllComments);
exports.default = router;

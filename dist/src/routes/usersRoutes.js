"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//for users routes
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.get('/users/all', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, usersController_1.getUsers);

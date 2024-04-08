"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillsController_1 = require("../controllers/skillsController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.post('/skills', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, skillsController_1.createSkill);
router.get('/skills', skillsController_1.getAllSkills);
exports.default = router;

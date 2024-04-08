"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectsController_1 = require("../controllers/projectsController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.post('/projects', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, projectsController_1.createProject);
router.get('/projects', projectsController_1.getAllProjects);
router.delete('/projects/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, projectsController_1.deleteProject);
router.put('/projects/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, projectsController_1.updateProject);
router.get('/projects/:id', projectsController_1.getProject);
exports.default = router;

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
exports.deleteProject = exports.updateProject = exports.getProject = exports.getAllProjects = exports.createProject = void 0;
const handleTryAndCatch_1 = require("../Middleware/handleTryAndCatch");
const Project_1 = __importDefault(require("../models/Project"));
exports.createProject = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectName, imageUrl, project_description, skills, sourceCode } = req.body;
    const project = yield Project_1.default.create({ projectName, imageUrl, skills, sourceCode, project_description, livePreview: '' });
    res.status(201).json({ project });
}));
exports.getAllProjects = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield Project_1.default.find({});
    res.status(200).json({ projects });
}));
exports.getProject = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield Project_1.default.findById(id);
    if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
    }
    res.status(200).json({ project });
}));
// update project
exports.updateProject = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { projectName, imageUrl, project_description, skills, sourceCode } = req.body;
    const project = yield Project_1.default.findById(id);
    if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
    }
    project.projectName = projectName;
    project.imageUrl = imageUrl;
    project.project_description = project_description;
    project.skills = skills;
    project.sourceCode = sourceCode;
    yield project.save();
    res.status(200).json({ project });
}));
// delete project
exports.deleteProject = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Project_1.default.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted' });
}));

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
exports.getAllSkills = exports.createSkill = void 0;
const handleTryAndCatch_1 = require("../Middleware/handleTryAndCatch");
const Skill_1 = __importDefault(require("../models/Skill"));
exports.createSkill = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level } = req.body;
    const skill = yield Skill_1.default.create({ name, level });
    res.status(201).json({ skill });
}));
exports.getAllSkills = (0, handleTryAndCatch_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield Skill_1.default.find({});
    res.status(200).json({ skills });
}));

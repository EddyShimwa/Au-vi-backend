"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const commentsRoutes_1 = __importDefault(require("./routes/commentsRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express_1.default.json());
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use('/api', authRoutes_1.default);
app.use('/api', blogRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});
app.use('/api', skillRoutes_1.default);
app.use('/api', commentsRoutes_1.default);
app.use('/api', projectRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Your Server is running on port ${PORT}`);
});
exports.default = app;

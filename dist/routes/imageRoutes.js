"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesController_1 = require("../controllers/imagesController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /images/createImage:
 *   post:
 *     summary: Create a new image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: The image was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/images/createImage', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, imagesController_1.createImage);
/**
 * @swagger
 * /images/editImage/{id}:
 *   put:
 *     summary: Edit an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: The image was successfully updated
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.put('/images/editImage/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, imagesController_1.editImage);
/**
 * @swagger
 * /images/all:
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: A list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *                   likesCount:
 *                     type: number
 *                   likedBy:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/images/all', imagesController_1.getAllImages);
/**
 * @swagger
 * /images/incrementLikes/{id}:
 *   post:
 *     summary: Increment likes for an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID
 *     responses:
 *       200:
 *         description: The image likes were successfully incremented
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/images/incrementLikes/:id', authsMiddleware_1.isAuthenticated, imagesController_1.incrementLikes);
/**
 * @swagger
 * /images/deleteImage/{id}:
 *   delete:
 *     summary: Delete an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID
 *     responses:
 *       200:
 *         description: The image was successfully deleted
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.delete('/images/deleteImage/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, imagesController_1.deleteImage);
exports.default = router;

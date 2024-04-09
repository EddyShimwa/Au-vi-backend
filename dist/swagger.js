"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My APIs',
            version: '1.0.0',
            description: 'My Brand Apis',
        },
        servers: [
            {
                url: 'https://my-brand-backend-ts-byzx.onrender.com',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;

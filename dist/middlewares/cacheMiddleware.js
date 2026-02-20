"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const cache_1 = __importDefault(require("../utils/cache"));
const cacheMiddleware = (key) => {
    return (req, res, next) => {
        const cachedData = cache_1.default.get(key);
        if (cachedData) {
            return res.status(200).json({
                success: true,
                message: "Data served from cache",
                data: cachedData,
            });
        }
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;

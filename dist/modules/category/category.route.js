"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/cat", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("SUPER_ADMIN", "ADMIN"), category_controller_1.CategoryController.create);
router.get("/cat", category_controller_1.CategoryController.getAll);
exports.CategoryRoutes = router;

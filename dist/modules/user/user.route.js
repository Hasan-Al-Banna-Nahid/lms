"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/create-admin", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("SUPER_ADMIN"), user_controller_1.UserController.createAdmin);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("SUPER_ADMIN", "ADMIN"), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;

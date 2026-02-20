"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("INSTRUCTOR"), course_controller_1.CourseController.create);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("INSTRUCTOR", "ADMIN", "SUPER_ADMIN"), course_controller_1.CourseController.remove);
exports.CourseRoutes = router;

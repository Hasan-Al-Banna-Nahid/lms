"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("./lesson.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("INSTRUCTOR"), lesson_controller_1.LessonController.create);
router.get("/course/:courseId", lesson_controller_1.LessonController.getByCourse);
exports.LessonRoutes = router;

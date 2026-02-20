"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const enrollment_controller_1 = require("./enrollment.controller");
const router = express_1.default.Router();
router.post("/enroll", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("STUDENT"), enrollment_controller_1.EnrollmentController.enroll);
router.patch("/progress/:courseId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("STUDENT"), enrollment_controller_1.EnrollmentController.updateProgress);
exports.EnrollmentRoutes = router;

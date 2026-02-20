"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./modules/auth/auth.route");
const category_route_1 = require("./modules/category/category.route");
const course_route_1 = require("./modules/course/course.route");
const lesson_route_1 = require("./modules/lesson/lesson.route");
const enrollment_route_1 = require("./modules/enrollment/enrollment.route");
const analytics_route_1 = require("./modules/analytics/analytics.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use("/api/v1", auth_route_1.AuthRoutes);
app.use("/api/v1", category_route_1.CategoryRoutes);
app.use("/api/v1/course", course_route_1.CourseRoutes);
app.use("/api/v1/lession", lesson_route_1.LessonRoutes);
app.use("/api/v1", enrollment_route_1.EnrollmentRoutes);
app.use("/api/v1", analytics_route_1.AnalyticsRoutes);
app.use("/api/v1", user_route_1.UserRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Requested API route not found!",
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_service_1 = require("./course.service");
exports.CourseController = {
    create: async (req, res) => {
        try {
            const result = await course_service_1.CourseService.createCourse(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    remove: async (req, res) => {
        try {
            await course_service_1.CourseService.deleteCourse(req.user.id, req.params.id, req.user.role);
            res.status(200).json({
                success: true,
                message: "Course deleted successfully (Soft Delete)",
            });
        }
        catch (err) {
            res.status(403).json({
                success: false,
                message: err.message,
            });
        }
    },
};

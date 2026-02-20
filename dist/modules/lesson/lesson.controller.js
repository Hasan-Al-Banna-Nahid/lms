"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const lesson_service_1 = require("./lesson.service");
exports.LessonController = {
    create: async (req, res) => {
        try {
            const result = await lesson_service_1.LessonService.addLesson(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    getByCourse: async (req, res) => {
        try {
            const result = await lesson_service_1.LessonService.getCourseLessons(req.params.courseId);
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};

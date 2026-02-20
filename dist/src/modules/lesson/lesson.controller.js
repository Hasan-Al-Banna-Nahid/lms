import { LessonService } from "./lesson.service";
export const LessonController = {
    create: async (req, res) => {
        try {
            const result = await LessonService.addLesson(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    getByCourse: async (req, res) => {
        try {
            const result = await LessonService.getCourseLessons(req.params.courseId);
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};

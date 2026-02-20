import { CourseService } from "./course.service";
export const CourseController = {
    create: async (req, res) => {
        try {
            const result = await CourseService.createCourse(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    remove: async (req, res) => {
        try {
            await CourseService.deleteCourse(req.user.id, req.params.id, req.user.role);
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

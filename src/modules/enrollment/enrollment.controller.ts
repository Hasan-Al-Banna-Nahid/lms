import { Request, Response } from "express";
import { EnrollmentService } from "./enrollment.service";

export const EnrollmentController = {
  enroll: async (req: Request, res: Response) => {
    try {
      const result = await EnrollmentService.enrollInCourse(
        req.user!.id,
        req.body.courseId,
      );
      res.status(201).json({
        success: true,
        message: "Enrolled successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateProgress: async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      const { lessonId, isCompleted } = req.body;
      const result = await EnrollmentService.updateLessonProgress(
        req.user!.id,
        courseId,
        lessonId,
        isCompleted,
      );
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

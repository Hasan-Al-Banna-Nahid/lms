import { Request, Response } from "express";
import { LessonService } from "./lesson.service";

export const LessonController = {
  create: async (req: Request, res: Response) => {
    try {
      const result = await LessonService.addLesson(req.user!.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getByCourse: async (req: Request, res: Response) => {
    try {
      const result = await LessonService.getCourseLessons(req.params.courseId);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

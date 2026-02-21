import { Request, Response } from "express";
import { LessonService } from "./lesson.service";

export class LessonController {
  private lessonService: LessonService;

  constructor(lessonService: LessonService) {
    this.lessonService = lessonService;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.lessonService.addLesson(req.user!.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public getByCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.lessonService.getCourseLessons(
        req.params.courseId,
      );
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}

import { Request, Response } from "express";
import { EnrollmentService } from "./enrollment.service";

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor(enrollmentService: EnrollmentService) {
    this.enrollmentService = enrollmentService;
  }

  public enroll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.enrollmentService.enrollInCourse(
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
  };

  public updateProgress = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { courseId } = req.params;
      const { lessonId, isCompleted } = req.body;
      const result = await this.enrollmentService.updateLessonProgress(
        req.user!.id,
        courseId,
        lessonId,
        isCompleted,
      );
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}

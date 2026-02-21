import { Request, Response } from "express";
import { CourseService } from "./course.service";

export class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.courseService.createCourse(
        req.user!.id,
        req.body,
      );
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  public async remove(req: Request, res: Response): Promise<void> {
    try {
      await this.courseService.deleteCourse(
        req.user!.id,
        req.params.id,
        req.user!.role as string,
      );
      res.status(200).json({
        success: true,
        message: "Course deleted successfully (Soft Delete)",
      });
    } catch (err: any) {
      res.status(403).json({ success: false, message: err.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.courseService.getAllPublishedCourses();
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.courseService.getSingleCourse(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  }
}

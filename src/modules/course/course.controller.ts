import { Request, Response } from "express";
import { CourseService } from "./course.service";

export const CourseController = {
  create: async (req: Request, res: Response) => {
    try {
      const result = await CourseService.createCourse(req.user!.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      await CourseService.deleteCourse(
        req.user!.id,
        req.params.id,
        req.user!.role as string,
      );

      res.status(200).json({
        success: true,
        message: "Course deleted successfully (Soft Delete)",
      });
    } catch (err: any) {
      res.status(403).json({
        success: false,
        message: err.message,
      });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await CourseService.getAllPublishedCourses();
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const result = await CourseService.getSingleCourse(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
};

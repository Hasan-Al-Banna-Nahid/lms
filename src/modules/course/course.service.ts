import { CourseRepository } from "./course.repository";
import { createCourseSchema } from "./course.dto";

export const CourseService = {
  createCourse: async (instructorId: string, payload: any) => {
    const validatedData = createCourseSchema.parse({ body: payload });
    return await CourseRepository.create(instructorId, validatedData.body);
  },

  deleteCourse: async (
    instructorId: string,
    courseId: string,
    role: string,
  ) => {
    const course = await CourseRepository.findById(courseId);
    if (!course) throw new Error("Course not found");

    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN" &&
      course.instructorId !== instructorId
    ) {
      throw new Error("You are not authorized to delete this course");
    }

    return await CourseRepository.softDelete(courseId);
  },

  getAllPublishedCourses: async () => {
    return await CourseRepository.findAll({ status: "PUBLISHED" });
  },
  getSingleCourse: async (courseId: string) => {
    const course = await CourseRepository.findById(courseId);
    if (!course || course.isDeleted) {
      throw new Error("Course not found or has been removed");
    }
    return course;
  },
};

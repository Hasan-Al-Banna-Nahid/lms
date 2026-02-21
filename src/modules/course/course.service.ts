import { CourseRepository } from "./course.repository";
import { createCourseSchema } from "./course.dto";

export class CourseService {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  public async createCourse(instructorId: string, payload: any) {
    const validatedData = createCourseSchema.parse({ body: payload });
    return await this.repository.create(instructorId, validatedData.body);
  }

  public async deleteCourse(
    instructorId: string,
    courseId: string,
    role: string,
  ) {
    const course = await this.repository.findById(courseId);
    if (!course) throw new Error("Course not found");

    const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
    const isOwner = course.instructorId === instructorId;

    if (!isAdmin && !isOwner) {
      throw new Error("You are not authorized to delete this course");
    }

    return await this.repository.softDelete(courseId);
  }

  public async getAllPublishedCourses() {
    return await this.repository.findAll({ status: "PUBLISHED" });
  }

  public async getSingleCourse(courseId: string) {
    const course = await this.repository.findById(courseId);
    if (!course || course.isDeleted) {
      throw new Error("Course not found or has been removed");
    }
    return course;
  }
}

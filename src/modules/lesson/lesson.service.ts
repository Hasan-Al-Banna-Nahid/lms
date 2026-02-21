import { LessonRepository } from "./lesson.repository";
import { CourseRepository } from "../course/course.repository";
import { createLessonSchema } from "./lesson.dto";

export class LessonService {
  private lessonRepository: LessonRepository;
  private courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  public async addLesson(instructorId: string, payload: any) {
    const validatedData = createLessonSchema.parse({ body: payload });
    const lessonData = validatedData.body;

    const course = await this.courseRepository.findById(lessonData.courseId);
    if (!course || course.instructorId !== instructorId) {
      throw new Error("You are not authorized to add lessons to this course");
    }

    return await this.lessonRepository.create(lessonData);
  }

  public async getCourseLessons(courseId: string) {
    return await this.lessonRepository.findByCourseId(courseId);
  }
}

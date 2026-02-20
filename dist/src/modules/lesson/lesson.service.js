import { LessonRepository } from "./lesson.repository";
import { CourseRepository } from "../course/course.repository";
import { createLessonSchema } from "./lesson.dto";
export const LessonService = {
    addLesson: async (instructorId, payload) => {
        const validatedData = createLessonSchema.parse({ body: payload });
        const lessonData = validatedData.body;
        const course = await CourseRepository.findById(lessonData.courseId);
        if (!course || course.instructorId !== instructorId) {
            throw new Error("You are not authorized to add lessons to this course");
        }
        return await LessonRepository.create(lessonData);
    },
    getCourseLessons: async (courseId) => {
        return await LessonRepository.findByCourseId(courseId);
    },
};

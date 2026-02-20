"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const lesson_repository_1 = require("./lesson.repository");
const course_repository_1 = require("../course/course.repository");
const lesson_dto_1 = require("./lesson.dto");
exports.LessonService = {
    addLesson: async (instructorId, payload) => {
        const validatedData = lesson_dto_1.createLessonSchema.parse({ body: payload });
        const lessonData = validatedData.body;
        const course = await course_repository_1.CourseRepository.findById(lessonData.courseId);
        if (!course || course.instructorId !== instructorId) {
            throw new Error("You are not authorized to add lessons to this course");
        }
        return await lesson_repository_1.LessonRepository.create(lessonData);
    },
    getCourseLessons: async (courseId) => {
        return await lesson_repository_1.LessonRepository.findByCourseId(courseId);
    },
};

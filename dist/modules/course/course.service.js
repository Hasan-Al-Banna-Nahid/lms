"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const course_repository_1 = require("./course.repository");
const course_dto_1 = require("./course.dto");
exports.CourseService = {
    createCourse: async (instructorId, payload) => {
        const validatedData = course_dto_1.createCourseSchema.parse({ body: payload });
        return await course_repository_1.CourseRepository.create(instructorId, validatedData.body);
    },
    deleteCourse: async (instructorId, courseId, role) => {
        const course = await course_repository_1.CourseRepository.findById(courseId);
        if (!course)
            throw new Error("Course not found");
        if (role !== "ADMIN" &&
            role !== "SUPER_ADMIN" &&
            course.instructorId !== instructorId) {
            throw new Error("You are not authorized to delete this course");
        }
        return await course_repository_1.CourseRepository.softDelete(courseId);
    },
    getAllPublishedCourses: async () => {
        return await course_repository_1.CourseRepository.findAll({ status: "PUBLISHED" });
    },
};

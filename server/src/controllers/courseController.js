import { CourseModel } from '../models/courseModel.js';
import { EnrollmentModel } from '../models/enrollmentModel.js';

export const CourseController = {
  getAllCourses: async (req, res) => {
    const courses = await CourseModel.findAll();
    res.json({
      success: true,
      data: courses
    });
  },

  getCourseById: async (req, res) => {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: { message: 'Course not found' }
      });
    }
    res.json({
      success: true,
      data: course
    });
  },

  enrollCourse: async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;

    // Check if already enrolled
    const existing = await EnrollmentModel.findByUserAndCourse(userId, courseId);
    if (existing) {
      return res.status(400).json({
        success: false,
        error: { message: 'Already enrolled in this course' }
      });
    }

    // Create enrollment
    await EnrollmentModel.create(userId, courseId);
    await CourseModel.updateStudentCount(courseId, true);

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  },

  updateProgress: async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;
    const { progress } = req.body;

    const enrollment = await EnrollmentModel.findByUserAndCourse(userId, courseId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: { message: 'Enrollment not found' }
      });
    }

    await EnrollmentModel.updateProgress(enrollment.id, progress);

    res.json({
      success: true,
      message: 'Progress updated successfully'
    });
  }
};
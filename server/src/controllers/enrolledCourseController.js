import { EnrolledCourseModel } from '../models/enrolledCourseModel.js';

export const EnrolledCourseController = {
  getEnrolledCourses: async (req, res) => {
    try {
      const { userId } = req.user;
      
      // Get enrolled courses with basic info
      const courses = await EnrolledCourseModel.findByUserId(userId);
      
      // Get chapter progress for each course
      const coursesWithChapters = await Promise.all(
        courses.map(async (course) => {
          const chapters = await EnrolledCourseModel.getChapterProgress(
            userId,
            course.id
          );
          
          return {
            ...course,
            chapters
          };
        })
      );

      res.json({
        success: true,
        data: coursesWithChapters
      });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching enrolled courses' }
      });
    }
  }
};
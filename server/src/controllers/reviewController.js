
import { ReviewModel } from '../models/reviewModel.js';

export const ReviewController = {
  submitReview: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId } = req.params;
      const { feedback, rating } = req.body;

      // Check if user has already reviewed this course
      const existingReview = await ReviewModel.findByUserAndCourse(userId, courseId);
      if (existingReview) {
        return res.status(400).json({
          success: false,
          error: { message: 'You have already reviewed this course' }
        });
      }

      const review = await ReviewModel.create({
        userId,
        courseId,
        feedback,
        rating
      });

      res.status(201).json({
        success: true,
        data: review
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error submitting review' }
      });
    }
  },

  getCourseReviews: async (req, res) => {
    try {
      const { courseId } = req.params;
      const reviews = await ReviewModel.findByCourse(courseId);

      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching reviews' }
      });
    }
  }
};

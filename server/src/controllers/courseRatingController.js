import { CourseRatingModel } from "../models/courseRatingModel.js";

export const CourseRatingController = {
  getRatings: async (req, res) => {
    try {
      const { courseId } = req.params;
      const distribution = await CourseRatingModel.getDistribution(courseId);

      res.json({
        success: true,
        data: distribution,
      });
    } catch (error) {
      console.error("Error getting course ratings:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error fetching course ratings" },
      });
    }
  },

  submitRating: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { rating } = req.body;
      const { userId } = req.user;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          error: { message: "Invalid rating value" },
        });
      }

      // Check if user has already rated this course
      const existingRating = await CourseRatingModel.findByUserAndCourse(
        userId,
        courseId
      );

      if (existingRating) {
        // Update existing rating
        await CourseRatingModel.update(existingRating.id, rating);
      } else {
        // Create new rating
        await CourseRatingModel.create(userId, courseId, rating);
      }

      // Update course average rating
      await CourseRatingModel.updateCourseAverageRating(courseId);

      res.json({
        success: true,
        message: "Rating submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error submitting rating" },
      });
    }
  },
};

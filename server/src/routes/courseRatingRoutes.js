import express from "express";
import { CourseRatingController } from "../controllers/courseRatingController.js";
import { authenticateUser } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Get course ratings distribution
router.get(
  "/:courseId/ratings",
  asyncHandler(CourseRatingController.getRatings)
);

// Submit a rating (requires authentication)
router.post(
  "/:courseId/ratings",
  authenticateUser,
  asyncHandler(CourseRatingController.submitRating)
);

export default router;

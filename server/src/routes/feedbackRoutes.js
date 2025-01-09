import express from "express";
import { FeedbackController } from "../controllers/feedbackController.js";
import { authenticateUser } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.use(authenticateUser);

// Submit feedback for a course
router.post(
  "/:courseId/feedback",
  asyncHandler(FeedbackController.submitFeedback)
);

export default router;

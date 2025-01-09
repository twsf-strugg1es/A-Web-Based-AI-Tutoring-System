
import express from 'express';
import { ReviewController } from '../controllers/reviewController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authenticateUser);

router.post('/courses/:courseId/reviews', asyncHandler(ReviewController.submitReview));
router.get('/courses/:courseId/reviews', asyncHandler(ReviewController.getCourseReviews));

export default router;

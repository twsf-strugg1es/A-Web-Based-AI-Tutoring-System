import express from 'express';
import { AdminController } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(adminAuth);

// Existing routes...
router.get('/dashboard/stats', asyncHandler(AdminController.getDashboardStats));
router.get('/courses', asyncHandler(AdminController.getCoursesList));
router.put('/courses/:courseId/status', asyncHandler(AdminController.updateCourseStatus));
router.get('/courses/:courseId/feedback', asyncHandler(AdminController.getCourseFeedback));
<<<<<<< Updated upstream
router.get('/reviews/unread', asyncHandler(AdminController.getUnreadReviews));
router.put('/reviews/:reviewId/mark-read', asyncHandler(AdminController.markReviewAsRead));

=======
router.get('/feedback', asyncHandler(AdminController.getFeedback));
router.put('/feedback/:feedbackId/read', asyncHandler(AdminController.markFeedbackAsRead));
>>>>>>> Stashed changes
// New route for course creation
router.post('/courses', asyncHandler(AdminController.createCourse));

export default router;
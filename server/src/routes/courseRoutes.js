import express from 'express';
import { CourseController } from '../controllers/courseController.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateProgress } from '../middleware/validators.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(CourseController.getAllCourses));
router.get('/:id', asyncHandler(CourseController.getCourseById));

// Protected routes
router.use(authenticateUser);
router.post('/:courseId/enroll', asyncHandler(CourseController.enrollCourse));
router.put('/:courseId/progress', validateProgress, asyncHandler(CourseController.updateProgress));

export default router;
import express from 'express';
import { EnrolledCourseController } from '../controllers/enrolledCourseController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/enrolled', asyncHandler(EnrolledCourseController.getEnrolledCourses));

export default router;
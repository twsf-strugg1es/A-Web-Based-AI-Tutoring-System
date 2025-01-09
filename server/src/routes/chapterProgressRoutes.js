import express from 'express';
import { ChapterProgressController } from '../controllers/chapterProgressController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authenticateUser);

router.post(
  '/:courseId/chapters/:chapterId/video-progress',
  asyncHandler(ChapterProgressController.updateVideoProgress)
);

router.post(
  '/:courseId/chapters/:chapterId/mcq-progress',
  asyncHandler(ChapterProgressController.updateMcqProgress)
);

router.post(
  '/courseId/enrollment/chapterIndex',
  asyncHandler(ChapterProgressController.updateLastAccChapIdx)
);

router.get(
  '/:courseId/chapters/:chapterId/progress/:enrollmentId',
  asyncHandler(ChapterProgressController.getChapterProgress)
);

export default router;
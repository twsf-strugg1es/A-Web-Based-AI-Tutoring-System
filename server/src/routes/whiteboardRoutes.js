import express from 'express';
import { WhiteboardController } from '../controllers/whiteboardController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticateUser);

// Save whiteboard drawing
router.post('/:courseId/chapters/:chapterId/save', asyncHandler(WhiteboardController.saveDrawing));

// Get all drawings for the user
router.get('/drawings', asyncHandler(WhiteboardController.getAllDrawings));

// Delete a drawing
router.delete('/drawings/:drawingId', asyncHandler(WhiteboardController.deleteDrawing));

export default router;
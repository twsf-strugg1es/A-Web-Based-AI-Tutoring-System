import { WhiteboardModel } from '../models/whiteboardModel.js';

export const WhiteboardController = {
  saveDrawing: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId, chapterId } = req.params;
      const { imageBlob } = req.body;

      await WhiteboardModel.saveDrawing(userId, courseId, chapterId, imageBlob);
      
      res.json({
        success: true,
        message: 'Drawing saved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error saving drawing' }
      });
    }
  },

  getAllDrawings: async (req, res) => {
    try {
      const { userId } = req.user;
      const drawings = await WhiteboardModel.getAllDrawings(userId);
      
      res.json({
        success: true,
        data: drawings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching drawings' }
      });
    }
  },

  deleteDrawing: async (req, res) => {
    try {
      const { userId } = req.user;
      const { drawingId } = req.params;

      await WhiteboardModel.deleteDrawing(userId, drawingId);
      
      res.json({
        success: true,
        message: 'Drawing deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error deleting drawing' }
      });
    }
  }
};
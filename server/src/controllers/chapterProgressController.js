import { ChapterProgressModel } from "../models/chapterProgressModel.js";

export const ChapterProgressController = {
  updateVideoProgress: async (req, res) => {
    try {
      
      const { userId } = req.user;
      const { courseId, chapterId } = req.params;
      const { progress, enrollmentId,timeStamp } = req.body;

      await ChapterProgressModel.updateVideoProgress(
        userId,
        courseId,
        chapterId,
        progress,
        enrollmentId,
        timeStamp
      );

      

      res.json({
        success: true,
        message: "Video progress updated successfully",
      });
    } catch (error) {
      console.error("Error updating video progress:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error updating video progress" },
      });
    }
  },

  updateMcqProgress: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId, chapterId } = req.params;
      const { score, enrollmentId } = req.body;

      await ChapterProgressModel.updateMcqProgress(
        userId,
        courseId,
        chapterId,
        score,
        enrollmentId
      );

      res.json({
        success: true,
        message: "MCQ progress updated successfully",
      });
    } catch (error) {
      console.error("Error updating MCQ progress:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error updating MCQ progress" },
      });
    }
  },

  updateLastAccChapIdx: async (req, res) => {
    try {      
      const { enrollmentId, chapterIndex } = req.body;
      await ChapterProgressModel.updateLastAccChapIdx(
        chapterIndex,
        enrollmentId
      );

      res.json({
        success: true,
        message: "Last Chapter Index updated successfully",
      });
    } catch (error) {
      console.error("Last Chapter Index updated:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error updating Last Chapter Index" },
      });
    }
  },

  getChapterProgress: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId, chapterId,enrollmentId } = req.params;

      const progress = await ChapterProgressModel.getChapterProgress(
        userId,
        courseId,
        chapterId,
        enrollmentId
      );

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      console.error("Error getting chapter progress:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error getting chapter progress" },
      });
    }
  },
};

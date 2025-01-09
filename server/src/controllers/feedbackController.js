import { FeedbackModel } from "../models/feedbackModel.js";

export const FeedbackController = {
  submitFeedback: async (req, res) => {
    const { courseId } = req.params;
    const { message } = req.body;
    const { userId } = req.user;

    try {
      // Validate input
      if (!message?.trim()) {
        return res.status(400).json({
          success: false,
          error: { message: "Feedback message is required" },
        });
      }

      // Create feedback
      const feedbackId = await FeedbackModel.create({
        courseId,
        userId,
        message,
      });

      res.status(201).json({
        success: true,
        data: { id: feedbackId },
      });
    } catch (error) {
      console.error("Submit feedback error:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error submitting feedback" },
      });
    }
  },
};

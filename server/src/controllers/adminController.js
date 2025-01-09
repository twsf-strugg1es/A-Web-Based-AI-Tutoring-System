<<<<<<< Updated upstream
import { UserModel } from '../models/userModel.js';
import { AdminCourseModel } from '../models/adminModel.js';
import { v4 as uuidv4 } from 'uuid';
import { ReviewModel } from '../models/reviewModel.js';

=======
import { UserModel } from "../models/userModel.js";
import { AdminCourseModel } from "../models/adminModel.js";
import { v4 as uuidv4 } from "uuid";
>>>>>>> Stashed changes

export const AdminController = {
  getDashboardStats: async (req, res) => {
    try {
      const totalCourses = await CourseModel.getTotalCount();
      const publishedCourses = await CourseModel.getPublishedCount();
      const totalStudents = await UserModel.getStudentCount();

      res.json({
        success: true,
        data: {
          totalCourses,
          publishedCourses,
          totalStudents,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error fetching dashboard stats" },
      });
    }
  },

  getCoursesList: async (req, res) => {
    try {
      const { search = "" } = req.query;
      const courses = await AdminCourseModel.findAllWithStats(search);

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error fetching courses" },
      });
    }
  },
  getUnreadReviews: async (req, res) => {
    try {
      const reviews = await ReviewModel.getAllUnreadReviews();
      
      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      console.error('Error fetching unread reviews:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching unread reviews' }
      });
    }
  },

  markReviewAsRead: async (req, res) => {
    try {
      const { reviewId } = req.params;
      await ReviewModel.markAsRead(reviewId);
        
      res.json({
          success: true,
          message: 'Review marked as read'
      });
    } catch (error) {
      console.error('Error marking review as read:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error marking review as read' }
      });
    }
  },

  updateCourseStatus: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { status } = req.body;

      await AdminCourseModel.updateCourseStatus(courseId, status);

      res.json({
        success: true,
        message: "Course status updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error updating course status" },
      });
    }
  },
  getFeedback: async (req, res) => {
    try {
      const feedback = await AdminCourseModel.getAllFeedback();
      res.json({
        success: true,
        data: feedback
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching feedback' }
      });
    }
  },
  
  markFeedbackAsRead: async (req, res) => {
    try {
      const { feedbackId } = req.params;
      await AdminCourseModel.markFeedbackAsRead(feedbackId);
      res.json({
        success: true,
        message: 'Feedback marked as read'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error marking feedback as read' }
      });
    }
  },

  getCourseFeedback: async (req, res) => {
    try {
      const { courseId } = req.params;
      const feedback = await AdminCourseModel.getCourseFeedback(courseId);

      res.json({
        success: true,
        data: feedback,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error fetching course feedback" },
      });
    }
  },
  createCourse: async (req, res) => {
    try {
      const { title, description, instructor, level } = req.body;
      const { userId } = req.user;

      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          error: { message: "Course title is required" },
        });
      }

      const courseId = await AdminCourseModel.createCourse({
        title,
        description: description || "",
        instructor: instructor || "",
        level: level || "",
      });

      res.status(201).json({
        success: true,
        data: { id: courseId },
      });
    } catch (error) {
      console.error("Create course error:", error);
      res.status(500).json({
        success: false,
        error: { message: "Error creating course" },
      });
    }
  },
};

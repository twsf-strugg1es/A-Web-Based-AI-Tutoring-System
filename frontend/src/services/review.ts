import api from './api';

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  feedback: string;
  rating: number;
  createdAt: string;
  firstName: string;
  lastName: string;
}

export interface ReviewResponse {
  success: boolean;
  data?: Review;
  error?: {
    message: string;
  };
}

export const ReviewService = {
  submitReview: async (courseId: string, feedback: string, rating: number): Promise<ReviewResponse> => {
    try {
      const response = await api.post(`/courses/${courseId}/reviews`, {
        feedback,
        rating
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error submitting review'
        }
      };
    }
  },

  getCourseReviews: async (courseId: string): Promise<{ 
    success: boolean; 
    data?: Review[];
    error?: { message: string };
  }> => {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching reviews'
        }
      };
    }
  }
};

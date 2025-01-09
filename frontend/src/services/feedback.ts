import api from './api';

export interface FeedbackResponse {
  success: boolean;
  data?: {
    id: string;
  };
  error?: {
    message: string;
  };
}

export const FeedbackService = {
  submitFeedback: async (courseId: string, message: string): Promise<FeedbackResponse> => {
    try {
      const response = await api.post(`/courses/${courseId}/feedback`, { message });
      console.log(message);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error submitting feedback'
        }
      };
    }
  }
};
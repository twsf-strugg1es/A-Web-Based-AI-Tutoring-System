import api from './api';

export interface EnrollmentResponse {
  success: boolean;
  data?: {
    enrollmentId: string;
  };
  error?: {
    message: string;
  };
}

export const EnrollmentService = {
  enrollCourse: async (courseId: string, id:string): Promise<EnrollmentResponse> => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error enrolling in course'
        }
      };
    }
  }
};
import api from './api';

export interface EnrolledCourse extends Course {
  chapters: {
    id: string;
    title: string;
    progress: number;
  }[];
  overallProgress: number;
}

export interface EnrolledCoursesResponse {
  success: boolean;
  data?: EnrolledCourse[];
  error?: {
    message: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  duration: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  rating: number;
  students: number;
  interestName?: string;
  interestId?: string;
  progress?: number;
  lastAccessed?: string;
  enrollmentCount?: number;
}

export interface DashboardData {
  continueLearning: Course[];
  recommended: Course[];
  exploreNewSkills: Course[];
}

export interface CourseDetails extends Course {
  chapters: ChapterDetails[];
}

export interface ChapterDetails {
  id: string;
  title: string;
  videoLink: string;
  textNote: string | null;
  order: number;
}

export const CourseService = {
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await api.get('/courses');
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },

  getCourseDetails: async (courseId: string): Promise<CourseDetails | null> => {
    try {
      const response = await api.get(`/courses/${courseId}/details`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching course details:', error);
      return null;
    }
  },

  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await api.get('/dashboard');
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || 'Error fetching dashboard data');
    }
  },

  searchCourses: async (query: string): Promise<Course[]> => {
    try {
      const response = await api.get(`/courses/search?query=${encodeURIComponent(query)}`);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error searching courses:', error);
      return [];
    }
  },

  getCoursesByInterest: async (interestIds: string[]): Promise<Course[]> => {
    try {
      const response = await api.get(`/courses/by-interest?interestIds=${interestIds.join(',')}`);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching courses by interest:', error);
      return [];
    }
  },

  updateProgress: async (courseId: string, progress: number): Promise<void> => {
    try {
      await api.put(`/courses/${courseId}/progress`, { progress });
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || 'Error updating progress');
    }
  },

  getEnrolledCourses: async (): Promise<EnrolledCoursesResponse> => {
    try {
      const response = await api.get('/courses/enrolled');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching enrolled courses',
        },
      };
    }
  },
};

import api from './api';

export interface ChapterProgress {
  id: string;
  userId: string;
  courseId: string;
  chapterId: string;
  progress_video: number;
  score: number;
  feedback: string | null;
  progress_mcq: number;
  enrollmentId: string;
  timeStamp:number;
  lastChapterIndex:number;
}

export interface ChapterProgressResponse {
  success: boolean;
  data?: ChapterProgress;
  error?: {
    message: string;
  };
}

export const ChapterProgressService = {
  updateVideoProgress: async (
    courseId: string,
    chapterId: string,
    progress: number,
    enrollmentId: string,
    timeStamp:number
  ): Promise<ChapterProgressResponse> => {
    try {
      const response = await api.post(
        `/progress/${courseId}/chapters/${chapterId}/video-progress`,
        { progress, enrollmentId,timeStamp }
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error updating video progress'
        }
      };
    }
  },

  updateMcqProgress: async (
    courseId: string,
    chapterId: string,
    score: number,
    enrollmentId: string
  ): Promise<ChapterProgressResponse> => {
    try {
      const response = await api.post(
        `/progress/${courseId}/chapters/${chapterId}/mcq-progress`,
        { score, enrollmentId }
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error updating MCQ progress'
        }
      };
    }
  },

  updateLastAccChapIdx: async(chapterIndex: number, enrollmentId:string): Promise<any>=>{
    try {
      const response = await api.post(
        `/progress/courseId/enrollment/chapterIndex`,
        { chapterIndex, enrollmentId }
      );
      return true;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error updating MCQ progress'
        }
      };
    }
  },

  getChapterProgress: async (
    courseId: string,
    chapterId: string,
    enrollmentId:string,
  ): Promise<ChapterProgressResponse> => {
    try {
      const response = await api.get(
        `/progress/${courseId}/chapters/${chapterId}/progress/${enrollmentId}`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error getting chapter progress'
        }
      };
    }
  }
};
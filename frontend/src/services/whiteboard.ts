import api from './api';

export interface WhiteboardDrawing {
  id: string;
  courseId: string;
  chapterId: string;
  drawing: string;
  createdAt: string;
  courseName: string;
  chapterName: string;
}

export interface WhiteboardResponse {
  success: boolean;
  data?: WhiteboardDrawing[];
  message?: string;
  error?: {
    message: string;
  };
}

export const WhiteboardService = {
  saveDrawing: async (courseId: string, chapterId: string, imageBlob: string): Promise<WhiteboardResponse> => {
    try {
      const response = await api.post(`/whiteboard/${courseId}/chapters/${chapterId}/save`, {
        imageBlob
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error saving drawing'
        }
      };
    }
  },

  getAllDrawings: async (): Promise<WhiteboardResponse> => {
    try {
      const response = await api.get('/whiteboard/drawings');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching drawings'
        }
      };
    }
  },

  deleteDrawing: async (drawingId: string): Promise<WhiteboardResponse> => {
    try {
      const response = await api.delete(`/whiteboard/drawings/${drawingId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error deleting drawing'
        }
      };
    }
  }
};
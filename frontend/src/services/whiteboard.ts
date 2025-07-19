<<<<<<< Updated upstream
import api from './api';
=======
import api from "./api";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  saveDrawing: async (courseId: string, chapterId: string, imageBlob: string): Promise<WhiteboardResponse> => {
    try {
      const response = await api.post(`/whiteboard/${courseId}/chapters/${chapterId}/save`, {
        imageBlob
      });
=======
  saveDrawing: async (
    courseId: string,
    chapterId: string,
    imageBlob: string
  ): Promise<WhiteboardResponse> => {
    try {
      const response = await api.post(
        `/whiteboard/${courseId}/chapters/${chapterId}/save`,
        {
          imageBlob,
        }
      );
>>>>>>> Stashed changes
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
<<<<<<< Updated upstream
          message: error.response?.data?.error?.message || 'Error saving drawing'
        }
=======
          message:
            error.response?.data?.error?.message || "Error saving drawing",
        },
>>>>>>> Stashed changes
      };
    }
  },

  getAllDrawings: async (): Promise<WhiteboardResponse> => {
    try {
<<<<<<< Updated upstream
      const response = await api.get('/whiteboard/drawings');
=======
      const response = await api.get("/whiteboard/drawings");

>>>>>>> Stashed changes
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
<<<<<<< Updated upstream
          message: error.response?.data?.error?.message || 'Error fetching drawings'
        }
=======
          message:
            error.response?.data?.error?.message || "Error fetching drawings",
        },
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          message: error.response?.data?.error?.message || 'Error deleting drawing'
        }
      };
    }
  }
};
=======
          message:
            error.response?.data?.error?.message || "Error deleting drawing",
        },
      };
    }
  },
};
>>>>>>> Stashed changes

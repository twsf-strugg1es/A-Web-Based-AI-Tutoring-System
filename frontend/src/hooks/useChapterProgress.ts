import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  ChapterProgressService,
  ChapterProgress,
} from "../services/chapterProgress";

export function useChapterProgress(
  courseId: string,
  chapterId: string,
  enrollmentId: string
) {
  const [progress, setProgress] = useState<ChapterProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId && chapterId && enrollmentId) {
      loadProgress();
    }
  }, [courseId, chapterId, enrollmentId]);

  const loadProgress = async () => {
    try {
      const response = await ChapterProgressService.getChapterProgress(
        courseId,
        chapterId,
        enrollmentId
      );
      console.log(enrollmentId,chapterId,courseId);
      console.log('API Response:', response);
      if (response.success && response.data) {
        setProgress(response.data as ChapterProgress);
      } else {
        console.error('Failed to load progress:', response.error);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const updateVideoProgress = async (
    progressValue: number,
    timeStamp: number
  ) => {
    try {
      const response = await ChapterProgressService.updateVideoProgress(
        courseId,
        chapterId,
        progressValue,
        enrollmentId,
        timeStamp
      );

      if (response.success) {
        await loadProgress();
      } else {
        toast.error(response.error?.message || "Error updating video progress");
      }
    } catch (error) {
      console.error("Error updating video progress:", error);
      toast.error("Failed to update video progress");
    }
  };

  const updateMcqProgress = async (score: number) => {
    try {
      const response = await ChapterProgressService.updateMcqProgress(
        courseId,
        chapterId,
        score,
        enrollmentId
      );

      if (response.success) {
        await loadProgress();
        toast.success("MCQ progress updated successfully");
      } else {
        toast.error(response.error?.message || "Error updating MCQ progress");
      }
    } catch (error) {
      console.error("Error updating MCQ progress:", error);
      toast.error("Failed to update MCQ progress");
    }
  };

  return {
    progress,
    isLoading,
    updateVideoProgress,
    updateMcqProgress,
  };
}

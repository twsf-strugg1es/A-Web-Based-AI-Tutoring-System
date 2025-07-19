import { query } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

export const ChapterProgressModel = {
  // Create or update video progress
  updateVideoProgress: async (
    userId,
    courseId,
    chapterId,
    progressVideo,
    enrollmentId,
    timeStamp
  ) => {
    try {
      // Check if record exists
      console.log("Checking existing video progress record:", {
        userId,
        courseId,
        chapterId,
      });
      const existingRecord = await query(
        "SELECT * FROM user_chapter_progress WHERE userId = ? AND courseId = ? AND chapterId = ?",
        [userId, courseId, chapterId]
      );

      if (existingRecord.length > 0) {
        console.log("Existing video progress record found:", existingRecord[0]);
        // Update only if new progress is higher
        if (progressVideo > (existingRecord[0].progress_video || 0)) {
          await query(
            "UPDATE user_chapter_progress SET progress_video = ?, timeStamp=? WHERE userId = ? AND courseId = ? AND chapterId = ?",
            [progressVideo, timeStamp, userId, courseId, chapterId]
          );
          console.log("Video progress updated. New timeStamp:", timeStamp);
        }
      } else {
        // Create new record
        console.log(
          "No existing video progress record found. Creating new one."
        );
        const id = uuidv4();
        await query(
          "INSERT INTO user_chapter_progress (id, userId, courseId, chapterId, progress_video, enrollmentId, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            userId,
            courseId,
            chapterId,
            progressVideo,
            enrollmentId,
            timeStamp,
          ]
        );
      }

      // Update overall course progress
      await updateOverallProgress(userId, courseId);

      return true;
    } catch (error) {
      console.error("Error updating video progress:", error);
      throw error;
    }
  },

  updateLastAccChapIdx: async (chapterIndex, enrollmentId) => {
    try {
      console.log(enrollmentId, chapterIndex);

      await query("UPDATE enrollment SET lastChapterIndex = ? WHERE id = ?", [
        chapterIndex,
        enrollmentId,
      ]);

      return true;
    } catch (error) {
      console.error("Error updating MCQ progress:", error);
      throw error;
    }
  },

  // Update MCQ progress and score
  updateMcqProgress: async (
    userId,
    courseId,
    chapterId,
    score,
    enrollmentId
  ) => {
    try {
      console.log("Checking existing MCQ progress record:", {
        userId,
        courseId,
        chapterId,
      });
      const existingRecord = await query(
        "SELECT * FROM user_chapter_progress WHERE userId = ? AND courseId = ? AND chapterId = ?",
        [userId, courseId, chapterId]
      );

      if (existingRecord.length > 0) {
        console.log("Existing MCQ progress record found:", existingRecord[0]);
        // Update score only if new score is higher
        const currentScore = existingRecord[0].score || 0;
        const newScore = score > currentScore ? score : currentScore;

        await query(
          "UPDATE user_chapter_progress SET score = ?, progress_mcq = 1 WHERE userId = ? AND courseId = ? AND chapterId = ?",
          [newScore, userId, courseId, chapterId]
        );
        console.log("MCQ progress updated. New score:", newScore);
      } else {
        // Create new record
        console.log("No existing MCQ progress record found. Creating new one.");
        const id = uuidv4();
        await query(
          "INSERT INTO user_chapter_progress (id, userId, courseId, chapterId, score, progress_mcq, enrollmentId) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [id, userId, courseId, chapterId, score, 1, enrollmentId]
        );
      }

      // Update overall course progress
      await updateOverallProgress(userId, courseId);

      return true;
    } catch (error) {
      console.error("Error updating MCQ progress:", error);
      throw error;
    }
  },

  // Get chapter progress
  getChapterProgress: async (userId, courseId, chapterId, enrollmentId) => {
    try {
      console.log("Fetching chapter progress with parameters:", {
        userId,
        courseId,
        chapterId,
        enrollmentId,
      });

      const progress = await query(
        `SELECT c.*, e.lastChapterIndex 
         FROM user_chapter_progress c 
         LEFT JOIN enrollment e 
         ON c.enrollmentId = e.id
         WHERE c.userId = ? 
           AND c.courseId = ? 
           AND c.chapterId = ? 
           AND c.enrollmentId = ?
           AND e.id = ?`,
        [userId, courseId, chapterId, enrollmentId, enrollmentId]
      );

      if (!progress.length) {
        console.log("No progress found, inserting new record.");
        const newId = uuidv4(); // Generate a unique ID for the new record
        const insertResult = await query(
          `INSERT INTO user_chapter_progress (id, userId, courseId, chapterId, progress_video, score, feedback, progress_mcq, enrollmentId, timeStamp) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [newId, userId, courseId, chapterId, 0, 0, "", 0, enrollmentId, 0]
        );

        console.log("New chapter progress inserted:", insertResult);
        return {
          id: newId,
          userId,
          courseId,
          chapterId,
          progress_video: 0,
          score: 0,
          feedback: "",
          progress_mcq: 0,
          enrollmentId,
          timeStamp: 0,
          lastChapterIndex: 0, // Assuming initial state for lastChapterIndex
        };
      }

      console.log("Chapter progress fetched:", progress[0]);
      return progress[0];
    } catch (error) {
      console.error("Error getting chapter progress:", error);
      throw error;
    }
  },
};

// Helper function to update overall course progress
async function updateOverallProgress(userId, courseId) {
  try {
    console.log("Updating overall progress for user and course:", {
      userId,
      courseId,
    });
    // Get total number of chapters
    const totalChaptersData = await query(
      "SELECT COUNT(*) as count FROM chapter WHERE course_id = ?",
      [courseId]
    );
    const totalChapters = totalChaptersData[0].count;

    // Get progress for all chapters
    const chapterProgressData = await query(
      "SELECT progress_video, progress_mcq FROM user_chapter_progress WHERE userId = ? AND courseId = ?",
      [userId, courseId]
    );

    console.log("All chapter progress data fetched:", chapterProgressData);

    // Calculate overall progress
    let totalProgress = 0;
    chapterProgressData.forEach(({ progress_video, progress_mcq }) => {
      console.log(
        "Progress for chapter - video:",
        progress_video,
        "MCQ:",
        progress_mcq
      );
      totalProgress +=
        (progress_video * 0.6 + progress_mcq * 0.4) / totalChapters;
    });

    console.log("Total progress calculated:", totalProgress);
    const overallProgress = Math.round((totalProgress / totalChapters) * 100);

    // Update enrollment progress
    await query(
      "UPDATE enrollment SET progress = ? WHERE userId = ? AND courseId = ?",
      [overallProgress, userId, courseId]
    );
    console.log("Overall progress updated in enrollment:", overallProgress);

    return true;
  } catch (error) {
    console.error("Error updating overall progress:", error);
    throw error;
  }
}

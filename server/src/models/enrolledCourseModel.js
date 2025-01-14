<<<<<<< Updated upstream
import { query } from '../config/database.js';
=======
import { query } from "../config/database.js";
>>>>>>> Stashed changes

export const EnrolledCourseModel = {
  findByUserId: async (userId) => {
    const sql = `
      SELECT 
        c.*,
        e.progress as overallProgress,
        e.lastAccessed,
        i.name as interestName,
        i.id as interestId
      FROM enrollment e
      JOIN course c ON e.courseId = c.id
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON ci.interestId = i.id
      WHERE e.userId = ?
      ORDER BY e.lastAccessed DESC
    `;
    return query(sql, [userId]);
  },

  getChapterProgress: async (userId, courseId) => {
    const sql = `
<<<<<<< Updated upstream
      SELECT 
        ch.id,
        ch.title,
        COALESCE(
          GREATEST(
            COALESCE(ucp.progress_video, 0),
            COALESCE(ucp.progress_mcq, 0)
          ),
          0
        ) as progress
      FROM chapter ch
      LEFT JOIN user_chapter_progress ucp 
        ON ch.id = ucp.chapterId 
        AND ucp.userId = ?
      WHERE ch.course_id = ?
      ORDER BY ch.order ASC
    `;
    return query(sql, [userId, courseId]);
  }
};
=======
        SELECT 
            ch.id,
            ch.title,
            COALESCE(
                GREATEST(
                    COALESCE(ucp.progress_video, 0),
                    COALESCE(ucp.progress_mcq, 0)
                ),
                0
            ) AS progress
        FROM chapter ch
        LEFT JOIN user_chapter_progress ucp 
            ON ch.id = ucp.chapterId COLLATE utf8mb4_general_ci
            AND ucp.userId = ? COLLATE utf8mb4_general_ci
        WHERE ch.course_id = ? COLLATE utf8mb4_general_ci
        ORDER BY ch.order ASC;
    `;
    return query(sql, [userId, courseId]);
},
};
>>>>>>> Stashed changes

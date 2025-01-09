
import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const ReviewModel = {
  create: async ({ userId, courseId, feedback, rating }) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO review (id, userId, courseId, feedback, isRead, createdAt)
      VALUES (?, ?, ?, ?, false, NOW())
    `;
    await query(sql, [id, userId, courseId, feedback]);

    const ratingSql = `
      INSERT INTO rating (id, userId, courseId, rating, createdAt)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await query(ratingSql, [uuidv4(), userId, courseId, rating]);

    // Update course average rating
    await updateCourseRating(courseId);

    return { id, userId, courseId, feedback, rating };
  },

  getAllUnreadReviews: async () => {
    const sql = `
      SELECT 
        r.id,
        r.feedback,
        r.createdAt,
        r.isRead,
        c.title as courseTitle,
        u.firstName,
        u.lastName,
        rt.rating
      FROM review r
      JOIN course c ON r.courseId = c.id
      JOIN user u ON r.userId = u.id
      LEFT JOIN rating rt ON r.userId = rt.userId AND r.courseId = rt.courseId
      WHERE r.isRead = false
      ORDER BY r.createdAt DESC
    `;
    return query(sql);
  },

  markAsRead: async (reviewId) => {
    const sql = `
      UPDATE review
      SET isRead = true
      WHERE id = ?
    `;
    return query(sql, [reviewId]);
  },

  // ... keep existing methods ...
};

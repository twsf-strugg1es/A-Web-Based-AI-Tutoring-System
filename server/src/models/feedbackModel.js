import { query } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

export const FeedbackModel = {
  create: async ({ courseId, userId, message }) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO feedback (id, courseId, userId, message)
      VALUES (?, ?, ?, ?)
    `;

    await query(sql, [id, courseId, userId, message]);
    return id;
  },

  findByCourseId: async (courseId) => {
    const sql = `
      SELECT f.*, u.firstName, u.lastName
      FROM feedback f
      JOIN user u ON f.userId = u.id
      WHERE f.courseId = ?
      ORDER BY f.createdAt DESC
    `;
    return query(sql, [courseId]);
  },

  markAsRead: async (feedbackId) => {
    const sql = "UPDATE feedback SET isRead = true WHERE id = ?";
    return query(sql, [feedbackId]);
  },
};

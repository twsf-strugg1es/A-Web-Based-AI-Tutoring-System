import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const EnrollmentModel = {
  create: async (userId, courseId) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO enrollment (id, userId, courseId, progress, createdAt, updatedAt)
      VALUES (?, ?, ?, 0, NOW(), NOW())
    `;
    await query(sql, [id, userId, courseId]);
    return id;
  },

  findByUserAndCourse: async (userId, courseId) => {
    const sql = 'SELECT * FROM enrollment WHERE userId = ? AND courseId = ?';
    const enrollments = await query(sql, [userId, courseId]);
    return enrollments[0];
  },

  updateProgress: async (id, progress) => {
    const sql = 'UPDATE enrollment SET progress = ?, updatedAt = NOW() WHERE id = ?';
    await query(sql, [progress, id]);
  },

  getUserEnrollments: async (userId) => {
    const sql = `
      SELECT e.*, c.title, c.imageUrl, c.instructor
      FROM enrollment e
      JOIN course c ON e.courseId = c.id
      WHERE e.userId = ?
      ORDER BY e.createdAt DESC
    `;
    return query(sql, [userId]);
  }
};
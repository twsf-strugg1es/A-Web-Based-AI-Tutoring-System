import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const AdminCourseModel = {
  findAllWithStats: async (searchQuery = '') => {
    const sql = `
      SELECT 
        c.*,
        COUNT(DISTINCT f.id) as unreadFeedback
      FROM course c
      LEFT JOIN feedback f ON c.id = f.courseId AND f.isRead = false
      WHERE 
        c.title LIKE ? OR
        c.description LIKE ? OR
        c.instructor LIKE ?
      GROUP BY c.id
      ORDER BY c.createdAt DESC
    `;
    const searchTerm = `%${searchQuery}%`;
    
    return query(sql, [searchTerm, searchTerm, searchTerm]);
  },

  updateCourseStatus: async (courseId, status) => {
    const sql = 'UPDATE course SET status = ? WHERE id = ?';
    return query(sql, [status, courseId]);
  },

  // getCourseFeedback: async (courseId) => {
  //   const sql = `
  //     SELECT f.*, u.firstName, u.lastName
  //     FROM feedback f
  //     JOIN user u ON f.userId = u.id
  //     WHERE f.courseId = ?
  //     ORDER BY f.createdAt DESC
  //   `;
  //   return query(sql, [courseId]);
  // },
  getAllFeedback: async () => {
    const sql = `
      SELECT 
        f.id,
        f.courseId,
        c.title as courseName,
        f.userId,
        CONCAT(u.firstName, ' ', u.lastName) as userName,
        f.message,
        f.isRead,
        f.createdAt
      FROM feedback f
      JOIN course c ON f.courseId = c.id
      JOIN user u ON f.userId = u.id
      ORDER BY f.createdAt DESC
    `;
    return query(sql);
  },

  getCourseFeedback: async (courseId) => {
    const sql = `
      SELECT 
        f.id,
        f.courseId,
        c.title as courseName,
        f.userId,
        CONCAT(u.firstName, ' ', u.lastName) as userName,
        f.message,
        f.isRead,
        f.createdAt
      FROM feedback f
      JOIN course c ON f.courseId = c.id
      JOIN user u ON f.userId = u.id
      WHERE f.courseId = ?
      ORDER BY f.createdAt DESC
    `;
    return query(sql, [courseId]);
  },

  markFeedbackAsRead: async (feedbackId) => {
    const sql = 'UPDATE feedback SET isRead = true WHERE id = ?';
    return query(sql, [feedbackId]);
  },

  getUnreadFeedbackCount: async (courseId = null) => {
    const sql = courseId
      ? 'SELECT COUNT(*) as count FROM feedback WHERE courseId = ? AND isRead = false'
      : 'SELECT COUNT(*) as count FROM feedback WHERE isRead = false';
    
    const params = courseId ? [courseId] : [];
    const [result] = await query(sql, params);
    return result.count;
  },

  createCourse: async ({ title, description,instructor,level }) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO course (
        id, 
        title, 
        description, 
        status,
        instructor,
        imageUrl,
        duration,
        level,
        rating,
        students,
        createdAt,
        updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    await query(sql, [
      id,
      title,
      description,
      'draft',
      instructor, // instructor
      '', // imageUrl
      '', // duration
      level, // default level
      0, // initial rating
      0  // initial students
    ]);

    return id;
  }
};
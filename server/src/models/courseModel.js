import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const CourseModel = {
  create: async (courseData) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    await query(sql, [
      id,
      courseData.title,
      courseData.description,
      courseData.imageUrl,
      courseData.instructor,
      courseData.duration,
      courseData.level
    ]);
    return id;
  },

  findAll: async () => {
    const sql = 'SELECT * FROM course ORDER BY createdAt DESC';
    return query(sql);
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM course WHERE id = ?';
    const courses = await query(sql, [id]);
    return courses[0];
  },

  updateRating: async (id, rating) => {
    const sql = 'UPDATE course SET rating = ?, updatedAt = NOW() WHERE id = ?';
    await query(sql, [rating, id]);
  },

  updateStudentCount: async (id, increment = true) => {
    const sql = 'UPDATE course SET students = students + ?, updatedAt = NOW() WHERE id = ?';
    await query(sql, [increment ? 1 : -1, id]);
  }
};
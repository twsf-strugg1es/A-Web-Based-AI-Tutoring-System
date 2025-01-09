import { query } from '../config/database.js';

export const WhiteboardModel = {
  saveDrawing: async (userId, courseId, chapterId, imageBlob) => {
    const sql = `
      INSERT INTO whiteboard_drawings (id, userId, courseId, chapterId, drawing)
      VALUES (UUID(), ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      drawing = ?, updatedAt = NOW()
    `;
    return query(sql, [userId, courseId, chapterId, imageBlob, imageBlob]);
  },

  getAllDrawings: async (userId) => {
    const sql = `
      SELECT 
        wd.id,
        wd.courseId,
        wd.chapterId,
        wd.drawing,
        wd.createdAt,
        c.title as courseName,
        ch.title as chapterName
      FROM whiteboard_drawings wd
      JOIN course c ON wd.courseId = c.id
      JOIN chapter ch ON wd.chapterId = ch.id
      WHERE wd.userId = ?
      ORDER BY wd.createdAt DESC
    `;
    return query(sql, [userId]);
  },

  deleteDrawing: async (userId, drawingId) => {
    const sql = `
      DELETE FROM whiteboard_drawings
      WHERE id = ? AND userId = ?
    `;
    return query(sql, [drawingId, userId]);
  }
};
import { query } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

export const CourseRatingModel = {
  create: async (userId, courseId, rating) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO course_ratings (id, userId, courseId, rating)
      VALUES (?, ?, ?, ?)
    `;
    await query(sql, [id, userId, courseId, rating]);
    return id;
  },

  findByUserAndCourse: async (userId, courseId) => {
    const sql =
      "SELECT * FROM course_ratings WHERE userId = ? AND courseId = ?";
    const ratings = await query(sql, [userId, courseId]);
    return ratings[0];
  },

  update: async (id, rating) => {
    const sql = "UPDATE course_ratings SET rating = ? WHERE id = ?";
    await query(sql, [rating, id]);
  },

  getDistribution: async (courseId) => {
    const sql = `
      SELECT 
        COUNT(*) as totalRatings,
        AVG(rating) as averageRating,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating1,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating2,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating3,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating4,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating5
      FROM course_ratings
      WHERE courseId = ?
    `;
    const results = await query(sql, [courseId]);
    const data = results[0];

    return {
      totalRatings: Number(data.totalRatings),
      averageRating: Number(data.averageRating) || 0,
      distribution: {
        1: Number(data.rating1),
        2: Number(data.rating2),
        3: Number(data.rating3),
        4: Number(data.rating4),
        5: Number(data.rating5),
      },
    };
  },

  updateCourseAverageRating: async (courseId) => {
    const sql = `
      UPDATE course 
      SET rating = (
        SELECT AVG(rating) 
        FROM course_ratings 
        WHERE courseId = ?
      )
      WHERE id = ?
    `;
    await query(sql, [courseId, courseId]);
  },
};

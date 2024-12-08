import { query } from '../config/database.js';

export const CourseModel = {
  findAllWithInterests: async () => {
    const sql = `
      SELECT 
        c.*,
        i.name as interestName,
        i.id as interestId,
        COUNT(e.id) as enrollmentCount
      FROM course c
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON ci.interestId = i.id
      LEFT JOIN enrollment e ON c.id = e.courseId
      GROUP BY c.id, i.name, i.id
      ORDER BY c.rating DESC, enrollmentCount DESC
    `;
    return query(sql);
  },

  findById: async (id) => {
    const sql = `
      SELECT 
        c.*,
        i.name as interestName,
        i.id as interestId
      FROM course c
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON ci.interestId = i.id
      WHERE c.id = ?
    `;
    const courses = await query(sql, [id]);
    return courses[0];
  },

  findByInterests: async (interestIds) => {
    const sql = `
      SELECT DISTINCT 
        c.*,
        i.name as interestName,
        i.id as interestId,
        COUNT(e.id) as enrollmentCount
      FROM course c
      JOIN courses_interests ci ON c.id = ci.courseId
      JOIN interest i ON ci.interestId = i.id
      LEFT JOIN enrollment e ON c.id = e.courseId
      WHERE ci.interestId IN (?)
      GROUP BY c.id, i.name, i.id
      ORDER BY c.rating DESC, enrollmentCount DESC
    `;
    return query(sql, [interestIds]);
  },

  findBySearch: async (searchTerm) => {
    const sql = `
      SELECT DISTINCT 
        c.*,
        i.name as interestName,
        i.id as interestId
      FROM course c
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON ci.interestId = i.id
      WHERE 
        c.title LIKE ? OR 
        c.description LIKE ? OR 
        c.instructor LIKE ? OR
        i.name LIKE ?
      GROUP BY c.id
      ORDER BY c.rating DESC
    `;
    const term = `%${searchTerm}%`;
    return query(sql, [term, term, term, term]);
  },

  findRecommended: async (userId) => {
    const sql = `
      WITH UserInterests AS (
        SELECT DISTINCT i.id as interestId, i.name as interestName
        FROM user_interests ui
        JOIN interest i ON ui.interestId = i.id
        WHERE ui.userId = ?
      ),
      EnrolledCourses AS (
        SELECT courseId FROM enrollment WHERE userId = ?
      )
      SELECT DISTINCT 
        c.*,
        i.name as interestName,
        i.id as interestId,
        COUNT(e.id) as enrollmentCount
      FROM course c
      JOIN courses_interests ci ON c.id = ci.courseId
      JOIN interest i ON ci.interestId = i.id
      JOIN UserInterests ui ON i.id = ui.interestId
      LEFT JOIN enrollment e ON c.id = e.courseId
      WHERE c.id NOT IN (SELECT courseId FROM EnrolledCourses)
      GROUP BY c.id, i.name, i.id
      ORDER BY c.rating DESC, enrollmentCount DESC
      LIMIT 30
    `;
    return query(sql, [userId, userId]);
  },

  findContinueLearning: async (userId) => {
    const sql = `
      SELECT 
        c.*,
        e.progress,
        e.lastAccesed,
        i.name as interestName,
        i.id as interestId
      FROM enrollment e
      JOIN course c ON e.courseId = c.id
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON ci.interestId = i.id
      WHERE e.userId = ? AND e.progress < 100
      ORDER BY e.lastAccesed DESC
      LIMIT 6
    `;
    return query(sql, [userId]);
  },

  findExploreNewSkills: async (userId) => {
    const sql = `
      WITH UserInterests AS (
        SELECT interestId FROM user_interests WHERE userId = ?
      ),
      EnrolledCourses AS (
        SELECT courseId FROM enrollment WHERE userId = ?
      )
      SELECT DISTINCT 
        c.*,
        i.name as interestName,
        i.id as interestId,
        COUNT(e.id) as enrollmentCount
      FROM course c
      JOIN courses_interests ci ON c.id = ci.courseId
      JOIN interest i ON ci.interestId = i.id
      LEFT JOIN enrollment e ON c.id = e.courseId
      WHERE 
        ci.interestId NOT IN (SELECT interestId FROM UserInterests)
        AND c.id NOT IN (SELECT courseId FROM EnrolledCourses)
      GROUP BY c.id, i.name, i.id
      ORDER BY c.rating DESC, enrollmentCount DESC
      LIMIT 12
    `;
    return query(sql, [userId, userId]);
  }
};
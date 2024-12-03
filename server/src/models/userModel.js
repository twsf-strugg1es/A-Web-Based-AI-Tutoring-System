import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  create: async (userData) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO user (id, email, firstName, lastName, password, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    await query(sql, [id, userData.email, userData.firstName, userData.lastName, userData.password]);
    return id;
  },

  findByEmail: async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const users = await query(sql, [email]);
    return users[0];
  },

  findById: async (id) => {
    const sql = 'SELECT id, email, firstName, lastName, createdAt FROM user WHERE id = ?';
    const users = await query(sql, [id]);
    return users[0];
  },

  updateInterests: async (userId, interestIds) => {
    // First remove all existing interests
    await query('DELETE FROM user_interests WHERE userId = ?', [userId]);
    
    // Then add new interests
    for (const interestId of interestIds) {
      await query(
        'INSERT INTO user_interests (userId, interestId) VALUES (?, ?)',
        [userId, interestId,]
      );
    }
  }
};
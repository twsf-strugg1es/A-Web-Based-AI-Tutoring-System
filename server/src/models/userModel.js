import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  create: async (userData) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO user (
        id, 
        email, 
        firstName, 
        lastName, 
        password,
        account_settings,
        profile_picture_url,
        wishlist_count,
        cart_count,
        notifications_count,
        messages_count,
        createdAt, 
        updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const accountSettings = userData.accountSettings ? JSON.stringify(userData.accountSettings) : null;
    
    await query(sql, [
      id,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.password,
      accountSettings,
      null, // profile_picture_url
      0,    // wishlist_count
      0,    // cart_count
      0,    // notifications_count
      0,    // messages_count
    ]);
    
    return id;
  },

  findByEmail: async (email) => {
    const sql = `
      SELECT 
        id, 
        email, 
        firstName, 
        lastName, 
        password,
        profile_picture_url,
        wishlist_count,
        cart_count,
        notifications_count,
        messages_count,
        account_settings,
        payment_methods,
        subscriptions,
        createdAt
      FROM user 
      WHERE email = ?
    `;
    const users = await query(sql, [email]);
    return users[0];
  },

  findById: async (id) => {
    const sql = `
      SELECT 
        id, 
        email, 
        firstName, 
        lastName,
        profile_picture_url,
        wishlist_count,
        cart_count,
        notifications_count,
        messages_count,
        account_settings,
        payment_methods,
        subscriptions,
        createdAt 
      FROM user 
      WHERE id = ?
    `;
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
        [userId, interestId]
      );
    }
  },

  updateProfile: async (userId, updateData) => {
    const allowedFields = [
      'firstName',
      'lastName',
      'profile_picture_url',
      'account_settings'
    ];

    const updates = [];
    const values = [];

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    if (updates.length === 0) return;

    values.push(userId);

    const sql = `
      UPDATE user 
      SET ${updates.join(', ')} 
      WHERE id = ?
    `;

    await query(sql, values);
  }
};
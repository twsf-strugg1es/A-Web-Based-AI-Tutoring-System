import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import { InterestModel } from '../models/interestModel.js';

export const AuthController = {
  register: async (req, res) => {
    const { email, password, firstName, lastName, interests } = req.body;

    try {
      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: { message: 'Email already registered' }
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const userId = await UserModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });

      // Handle interests
      if (interests && interests.length > 0) {
        // Get all interests from database
        const allInterests = await InterestModel.findAll();
        const interestMap = new Map(allInterests.map(i => [i.name, i.id]));
        
        // Map interest names to IDs
        const interestIds = interests
          .map(name => interestMap.get(name))
          .filter(id => id); // Remove any undefined values

        if (interestIds.length > 0) {
          await UserModel.updateInterests(userId, interestIds);
        }
      }

      res.status(201).json({
        success: true,
        message: 'User registered successfully'
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error during registration' }
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid credentials' }
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid credentials' }
        });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error during login' }
      });
    }
  }
};
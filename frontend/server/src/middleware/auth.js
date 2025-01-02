import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Authentication required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired token' }
    });
  }
};
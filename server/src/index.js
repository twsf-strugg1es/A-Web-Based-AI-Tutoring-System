import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { dbConnect } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { initializeInterests } from './utils/initInterests.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and interests
const initializeApp = async () => {
  try {
    await dbConnect();
    console.log('Database connected successfully');
    
    await initializeInterests();
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Initialization failed:', err);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

initializeApp();
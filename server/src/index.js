import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import { dbConnect } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { initializeInterests } from "./utils/initInterests.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseSetupRoutes from "./routes/courseSetupRoutes.js";
import chat from "./routes/chat.js";
import interestRoutes from "./routes/interestRoutes.js";
<<<<<<< Updated upstream
import enrolledCourseRoutes from "./routes/enrolledCourseRoutes.js";
=======
import chapterProgressRoutes from "./routes/chapterProgressRoutes.js";
import enrolledCourseRoutes from "./routes/enrolledCourseRoutes.js";
import courseRatingRoutes from "./routes/courseRatingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import whiteboardRoutes from "./routes/whiteboardRoutes.js";
>>>>>>> Stashed changes
config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeApp = async () => {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    await initializeInterests();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Initialization failed:", err);
    process.exit(1);
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/course-setup", courseSetupRoutes);
app.use("/api/chat", chat);
app.use("/api/interests", interestRoutes);
<<<<<<< Updated upstream
app.use('/api/courses', enrolledCourseRoutes);
=======
app.use("/api/progress", chapterProgressRoutes);
app.use("/api/courses", enrolledCourseRoutes);
app.use("/api/courses", courseRatingRoutes);
app.use("/api/courses", feedbackRoutes);
app.use("/api/whiteboard", whiteboardRoutes);
>>>>>>> Stashed changes
// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

initializeApp();

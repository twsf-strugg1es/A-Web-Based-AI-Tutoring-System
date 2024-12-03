-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS coursekori;
USE coursekori;

-- Drop tables if they exist
DROP TABLE IF EXISTS course_ratings;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS courses_interests;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS interest;

-- Create tables
CREATE TABLE user (
  id CHAR(36) NOT NULL,
  email VARCHAR(191) NOT NULL,
  firstName VARCHAR(191) NOT NULL,
  lastName VARCHAR(191) NOT NULL,
  password VARCHAR(191) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE interest (
  id CHAR(36) NOT NULL,
  name VARCHAR(191) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE course (
  id CHAR(36) NOT NULL,
  title VARCHAR(191) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(191) NOT NULL,
  instructor VARCHAR(191) NOT NULL,
  duration VARCHAR(191) NOT NULL,
  level ENUM('BEGINNER','INTERMEDIATE','ADVANCED') NOT NULL,
  rating FLOAT DEFAULT 0,
  students INT DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE courses_interests (
  courseId CHAR(36) NOT NULL,
  interestId CHAR(36) NOT NULL,
  PRIMARY KEY (courseId,interestId),
  KEY interestId (interestId),
  CONSTRAINT courses_interests_ibfk_1 FOREIGN KEY (courseId) REFERENCES course (id) ON DELETE CASCADE,
  CONSTRAINT courses_interests_ibfk_2 FOREIGN KEY (interestId) REFERENCES interest (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE user_interests (
  userId CHAR(36) NOT NULL,
  interestId CHAR(36) NOT NULL,
  PRIMARY KEY (userId,interestId),
  KEY interestId (interestId),
  CONSTRAINT user_interests_ibfk_1 FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
  CONSTRAINT user_interests_ibfk_2 FOREIGN KEY (interestId) REFERENCES interest (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE enrollment (
  id CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  courseId CHAR(36) NOT NULL,
  progress INT DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastAccesed TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_enrollment (userId,courseId),
  KEY courseId (courseId),
  CONSTRAINT enrollment_ibfk_1 FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
  CONSTRAINT enrollment_ibfk_2 FOREIGN KEY (courseId) REFERENCES course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE course_ratings (
  id CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  courseId CHAR(36) NOT NULL,
  rating TINYINT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY userId (userId),
  KEY courseId (courseId),
  CONSTRAINT course_ratings_ibfk_1 FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
  CONSTRAINT course_ratings_ibfk_2 FOREIGN KEY (courseId) REFERENCES course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial interests
INSERT INTO interest (id, name) VALUES
(UUID(), 'programming'),
(UUID(), 'design'),
(UUID(), 'business'),
(UUID(), 'marketing'),
(UUID(), 'data-science'),
(UUID(), 'languages');

-- Insert sample courses with rating = 0
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'Web Development Bootcamp', 'Master full-stack web development with modern technologies including HTML5, CSS3, JavaScript, React, Node.js, and MongoDB.', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3', 'Sarah Johnson', '12 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Advanced Machine Learning', 'Deep dive into machine learning algorithms, neural networks, and AI applications.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3', 'Dr. Michael Chen', '10 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Digital Marketing Masterclass', 'Learn comprehensive digital marketing strategies including SEO and social media marketing.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3', 'Emily Parker', '8 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'UI/UX Design Fundamentals', 'Master the principles of user interface and user experience design.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3', 'Alex Turner', '6 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Mobile App Development', 'Build cross-platform mobile applications using React Native.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3', 'David Wilson', '10 weeks', 'INTERMEDIATE', 0, 0);

-- Map courses to interests
INSERT INTO courses_interests (courseId, interestId)
SELECT c.id, i.id
FROM course c, interest i
WHERE 
  (c.title = 'Web Development Bootcamp' AND i.name IN ('programming', 'design'))
  OR (c.title = 'Advanced Machine Learning' AND i.name IN ('programming', 'data-science'))
  OR (c.title = 'Digital Marketing Masterclass' AND i.name IN ('marketing', 'business'))
  OR (c.title = 'UI/UX Design Fundamentals' AND i.name = 'design')
  OR (c.title = 'Mobile App Development' AND i.name = 'programming');
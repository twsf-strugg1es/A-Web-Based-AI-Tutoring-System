-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 06:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursekori`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` char(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `instructor` varchar(191) NOT NULL,
  `duration` varchar(191) NOT NULL,
  `level` enum('BEGINNER','INTERMEDIATE','ADVANCED') NOT NULL,
  `rating` float DEFAULT 0,
  `students` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `title`, `description`, `imageUrl`, `instructor`, `duration`, `level`, `rating`, `students`, `createdAt`, `updatedAt`) VALUES
('67c1f7d8-b0c7-11ef-aeb2-d8bbc114656c', 'Modern JavaScript Development', 'Master JavaScript ES6+, async programming, and modern development practices.', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', 'John Smith', '10 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c1fae0-b0c7-11ef-aeb2-d8bbc114656c', 'Python for Beginners', 'Learn Python programming from scratch with practical projects.', 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0', 'Emma Davis', '8 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c1fb38-b0c7-11ef-aeb2-d8bbc114656c', 'Full Stack Web Development', 'Build complete web applications with React and Node.js.', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613', 'Michael Johnson', '12 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c1fb58-b0c7-11ef-aeb2-d8bbc114656c', 'Java Programming Masterclass', 'Comprehensive Java course covering core concepts to advanced topics.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 'Sarah Wilson', '14 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c1fb81-b0c7-11ef-aeb2-d8bbc114656c', 'Mobile App Development', 'Create iOS and Android apps using React Native.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', 'David Brown', '10 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c1fc67-b0c7-11ef-aeb2-d8bbc114656c', 'C++ Game Development', 'Learn game development principles using C++ and modern frameworks.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Robert Martinez', '16 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38828-b0c7-11ef-aeb2-d8bbc114656c', 'UI/UX Design Fundamentals', 'Master user interface and experience design principles.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 'Alice Cooper', '8 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38b8c-b0c7-11ef-aeb2-d8bbc114656c', 'Advanced Graphic Design', 'Create stunning visual designs using modern tools and techniques.', 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67', 'Tom Anderson', '10 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38bd7-b0c7-11ef-aeb2-d8bbc114656c', 'Web Design Mastery', 'Learn responsive web design and modern CSS frameworks.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8', 'Emily White', '6 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38bf7-b0c7-11ef-aeb2-d8bbc114656c', 'Motion Graphics Design', 'Create engaging animations and motion graphics.', 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c', 'Chris Taylor', '12 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38c13-b0c7-11ef-aeb2-d8bbc114656c', 'Brand Identity Design', 'Design compelling brand identities and visual systems.', 'https://images.unsplash.com/photo-1524383902171-424a40d4a3cd', 'Lisa Garcia', '8 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c38c85-b0c7-11ef-aeb2-d8bbc114656c', 'Product Design Workshop', 'Learn end-to-end product design process and methodologies.', 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e', 'Mark Williams', '10 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c52f85-b0c7-11ef-aeb2-d8bbc114656c', 'Business Strategy Fundamentals', 'Learn core business strategy and management principles.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'James Wilson', '8 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c533b7-b0c7-11ef-aeb2-d8bbc114656c', 'Entrepreneurship 101', 'Start and grow your own successful business.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', 'Patricia Moore', '12 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c5341a-b0c7-11ef-aeb2-d8bbc114656c', 'Financial Management', 'Master financial planning and management techniques.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f', 'Robert Lee', '10 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c5343a-b0c7-11ef-aeb2-d8bbc114656c', 'Project Management Professional', 'Learn professional project management methodologies.', 'https://images.unsplash.com/photo-1552664730-d307ca884978', 'Susan Taylor', '14 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c5345e-b0c7-11ef-aeb2-d8bbc114656c', 'Business Analytics', 'Use data analytics for better business decisions.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Michael Chen', '8 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c5347e-b0c7-11ef-aeb2-d8bbc114656c', 'Leadership and Management', 'Develop essential leadership and management skills.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', 'Elizabeth Brown', '6 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c323-b0c7-11ef-aeb2-d8bbc114656c', 'Digital Marketing Fundamentals', 'Master the basics of digital marketing.', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07', 'Sarah Johnson', '8 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c694-b0c7-11ef-aeb2-d8bbc114656c', 'Social Media Marketing', 'Create effective social media marketing strategies.', 'https://images.unsplash.com/photo-1611926653458-09294b3142bf', 'David Miller', '6 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c6d9-b0c7-11ef-aeb2-d8bbc114656c', 'Content Marketing Strategy', 'Develop compelling content marketing campaigns.', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', 'Jennifer Davis', '10 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c6fa-b0c7-11ef-aeb2-d8bbc114656c', 'SEO and SEM Mastery', 'Master search engine optimization and marketing.', 'https://images.unsplash.com/photo-1571721795195-a2ca2c0950ce', 'Andrew Wilson', '12 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c71b-b0c7-11ef-aeb2-d8bbc114656c', 'Email Marketing', 'Create successful email marketing campaigns.', 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f', 'Laura Thompson', '6 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c6c73b-b0c7-11ef-aeb2-d8bbc114656c', 'Brand Marketing', 'Build and grow strong brand presence.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', 'Richard Clark', '8 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84b29-b0c7-11ef-aeb2-d8bbc114656c', 'Data Science Fundamentals', 'Introduction to data science and analytics.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Dr. John Davis', '10 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84f32-b0c7-11ef-aeb2-d8bbc114656c', 'Machine Learning Basics', 'Learn fundamental machine learning algorithms.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c', 'Dr. Sarah Chen', '12 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84f7f-b0c7-11ef-aeb2-d8bbc114656c', 'Big Data Analytics', 'Master big data processing and analytics.', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0', 'Dr. Michael Lee', '14 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84fa1-b0c7-11ef-aeb2-d8bbc114656c', 'Python for Data Science', 'Use Python for data analysis and visualization.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Emma Wilson', '8 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84fc6-b0c7-11ef-aeb2-d8bbc114656c', 'Deep Learning', 'Advanced neural networks and deep learning.', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', 'Dr. Robert Zhang', '16 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c84fe9-b0c7-11ef-aeb2-d8bbc114656c', 'Statistical Analysis', 'Master statistical methods for data science.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Dr. Lisa Wang', '10 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9d833-b0c7-11ef-aeb2-d8bbc114656c', 'English for Beginners', 'Learn basic English communication skills.', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d', 'Mary Johnson', '12 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9db3b-b0c7-11ef-aeb2-d8bbc114656c', 'Business Spanish', 'Spanish for professional environments.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', 'Carlos Rodriguez', '10 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9db84-b0c7-11ef-aeb2-d8bbc114656c', 'Japanese Language', 'Comprehensive Japanese language course.', 'https://images.unsplash.com/photo-1528164344705-47542687000d', 'Yuki Tanaka', '16 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9dba1-b0c7-11ef-aeb2-d8bbc114656c', 'Mandarin Chinese', 'Learn Mandarin for business and travel.', 'https://images.unsplash.com/photo-1523794728-b31f4796e4f1', 'Li Wei', '20 weeks', 'INTERMEDIATE', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9dbbf-b0c7-11ef-aeb2-d8bbc114656c', 'French Language', 'Master French language and culture.', 'https://images.unsplash.com/photo-1549877452-9c387954fbc2', 'Sophie Martin', '14 weeks', 'ADVANCED', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35'),
('67c9dbdc-b0c7-11ef-aeb2-d8bbc114656c', 'German for Beginners', 'Learn basic German language skills.', 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b', 'Hans Mueller', '12 weeks', 'BEGINNER', 0, 0, '2024-12-02 16:06:35', '2024-12-02 16:06:35');

-- --------------------------------------------------------

--
-- Table structure for table `courses_interests`
--

CREATE TABLE `courses_interests` (
  `courseId` char(36) NOT NULL,
  `interestId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses_interests`
--

INSERT INTO `courses_interests` (`courseId`, `interestId`) VALUES
('67c1f7d8-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c1fae0-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c1fb38-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c1fb58-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c1fb81-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c1fc67-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('67c38828-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c38b8c-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c38bd7-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c38bf7-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c38c13-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c38c85-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('67c52f85-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c533b7-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c5341a-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c5343a-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c5345e-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c5347e-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('67c6c323-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c6c694-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c6c6d9-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c6c6fa-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c6c71b-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c6c73b-b0c7-11ef-aeb2-d8bbc114656c', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('67c84b29-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c84f32-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c84f7f-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c84fa1-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c84fc6-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c84fe9-b0c7-11ef-aeb2-d8bbc114656c', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('67c9d833-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('67c9db3b-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('67c9db84-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('67c9dba1-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('67c9dbbf-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('67c9dbdc-b0c7-11ef-aeb2-d8bbc114656c', 'f7b30abd-b024-11ef-9c26-d8bbc114656c');

-- --------------------------------------------------------

--
-- Table structure for table `course_ratings`
--

CREATE TABLE `course_ratings` (
  `id` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `courseId` char(36) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `courseId` char(36) NOT NULL,
  `progress` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastAccesed` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `userId`, `courseId`, `progress`, `createdAt`, `updatedAt`, `lastAccesed`) VALUES
('694c9132-b0ef-11ef-aeb2-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', '67c1f7d8-b0c7-11ef-aeb2-d8bbc114656c', 0, '2024-12-02 20:52:58', '2024-12-02 20:52:58', '2024-12-02 20:52:58'),
('73a28263-b0ef-11ef-aeb2-d8bbc114656c', '651f8c12-e05e-4d6c-9973-25c5f4e4f928', '67c9dbbf-b0c7-11ef-aeb2-d8bbc114656c', 20, '2024-12-02 20:53:15', '2024-12-02 20:54:38', '2024-11-30 20:53:05'),
('7f509a9c-b0ef-11ef-aeb2-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', '67c9dbbf-b0c7-11ef-aeb2-d8bbc114656c', 0, '2024-12-02 20:53:35', '2024-12-02 20:53:35', '2024-11-30 20:53:18'),
('9586b9fa-b0ef-11ef-aeb2-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', '67c6c73b-b0c7-11ef-aeb2-d8bbc114656c', 0, '2024-12-02 20:54:12', '2024-12-02 20:54:12', '2024-12-01 20:53:38'),
('9586c6f8-b0ef-11ef-aeb2-d8bbc114656c', '651f8c12-e05e-4d6c-9973-25c5f4e4f928', '67c38b8c-b0c7-11ef-aeb2-d8bbc114656c', 0, '2024-12-02 20:54:12', '2024-12-02 20:54:12', '2024-11-04 20:53:38'),
('a9efd887-a6c4-41b2-9e30-3c96f824c45d', 'b607a245-903d-4297-9ded-f7b3c24fa67a', '67c1f7d8-b0c7-11ef-aeb2-d8bbc114656c', 0, '2024-12-03 17:07:08', '2024-12-03 17:07:08', '2024-12-03 17:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE `interest` (
  `id` char(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interest`
--

INSERT INTO `interest` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('a5cc0b1b-ab04-4b1b-8a2b-54047395876b', 'marketing', '2024-12-01 20:50:52', '2024-12-01 20:50:52'),
('f05d4f13-d19e-4816-a0bd-c047e8aa3c93', 'data-science', '2024-12-01 20:50:52', '2024-12-01 20:50:52'),
('f7b30164-b024-11ef-9c26-d8bbc114656c', 'programming', '2024-12-01 20:43:49', '2024-12-02 20:14:18'),
('f7b30a78-b024-11ef-9c26-d8bbc114656c', 'business', '2024-12-01 20:43:49', '2024-12-02 20:14:24'),
('f7b30a9a-b024-11ef-9c26-d8bbc114656c', 'design', '2024-12-01 20:43:49', '2024-12-02 20:14:31'),
('f7b30abd-b024-11ef-9c26-d8bbc114656c', 'languages', '2024-12-01 20:43:49', '2024-12-02 20:14:37');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','success','warning','error') NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `userId`, `title`, `message`, `type`, `isRead`, `createdAt`) VALUES
('58e27bd0-b196-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'Welcome to CourseKori!', 'Start exploring our courses to begin your learning journey.', 'info', 1, '2024-12-03 16:47:56'),
('58e28338-b196-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'Course Recommendation', 'Based on your interests, check out our new Python course!', 'success', 1, '2024-12-03 16:47:56'),
('85451000-b198-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'New', 'Hello there, it is a new notification.', 'info', 1, '2024-12-03 17:03:30'),
('85451000-b198-11ef-99ea-d8bbc114656d', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'New', 'Hello there, it is a new notification.', 'info', 1, '2024-12-03 17:03:56');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `email` varchar(191) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `wishlist_count` int(11) DEFAULT 0,
  `cart_count` int(11) DEFAULT 0,
  `notifications_count` int(11) DEFAULT 0,
  `messages_count` int(11) DEFAULT 0,
  `account_settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`account_settings`)),
  `payment_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payment_methods`)),
  `subscriptions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`subscriptions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `firstName`, `lastName`, `password`, `createdAt`, `updatedAt`, `profile_picture_url`, `wishlist_count`, `cart_count`, `notifications_count`, `messages_count`, `account_settings`, `payment_methods`, `subscriptions`) VALUES
('1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'ahmad@gmail.com', 'Ahmad', 'Towsif', '$2a$12$0dX9loBiyQ5TdG1tbztp.uW5W7MxeO6iHhh5N3t1OD/1k8ATMxVge', '2024-12-02 20:16:48', '2024-12-02 20:16:48', NULL, 0, 0, 0, 0, NULL, NULL, NULL),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'niaz.nafi.rahman@g.bracu.ac.bd', 'Niaz', 'Rahman', '$2a$12$G6N61AJX2k7fal7OBsuRwOAP64kP4rSlBSlU83YSl5RQZdb6W2lhe', '2024-12-02 20:15:19', '2024-12-02 20:15:19', NULL, 0, 0, 0, 0, NULL, NULL, NULL),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'niaz@gmail.com', 'Niaz', 'Rahman', '$2a$12$MRq7kG7gEx/1TGxe4an4D.Ab3rIPdwR/yIxP.5Z69vshQsQn4Bgem', '2024-12-03 16:43:10', '2024-12-03 16:43:10', NULL, 0, 0, 0, 0, NULL, NULL, NULL),
('eac5ac6a-3197-4889-a825-ab7a2a65d63e', 'mehedi@gmail.com', 'Mehedi', 'Hasan', '$2a$12$jzVvarNkWT2HtLEbgDnA7egWppZyTZlsl1TpgKUgQ5A5yxYUi7FPq', '2024-12-03 04:39:12', '2024-12-03 04:39:12', NULL, 0, 0, 0, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_interests`
--

CREATE TABLE `user_interests` (
  `userId` char(36) NOT NULL,
  `interestId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_interests`
--

INSERT INTO `user_interests` (`userId`, `interestId`) VALUES
('1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'f05d4f13-d19e-4816-a0bd-c047e8aa3c93'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('eac5ac6a-3197-4889-a825-ab7a2a65d63e', 'f7b30164-b024-11ef-9c26-d8bbc114656c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses_interests`
--
ALTER TABLE `courses_interests`
  ADD PRIMARY KEY (`courseId`,`interestId`),
  ADD KEY `interestId` (`interestId`);

--
-- Indexes for table `course_ratings`
--
ALTER TABLE `course_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enrollment` (`userId`,`courseId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_interests`
--
ALTER TABLE `user_interests`
  ADD PRIMARY KEY (`userId`,`interestId`),
  ADD KEY `interestId` (`interestId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses_interests`
--
ALTER TABLE `courses_interests`
  ADD CONSTRAINT `courses_interests_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `courses_interests_ibfk_2` FOREIGN KEY (`interestId`) REFERENCES `interest` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `course_ratings`
--
ALTER TABLE `course_ratings`
  ADD CONSTRAINT `course_ratings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_ratings_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_interests`
--
ALTER TABLE `user_interests`
  ADD CONSTRAINT `user_interests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_interests_ibfk_2` FOREIGN KEY (`interestId`) REFERENCES `interest` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

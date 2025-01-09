-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2025 at 09:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_user` (IN `user_id` CHAR(36))   BEGIN
    DELETE FROM `users` WHERE `id` = user_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `title` varchar(191) NOT NULL,
  `video_link` text NOT NULL,
  `text_note` text NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `progress` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`id`, `course_id`, `title`, `video_link`, `text_note`, `order`, `createdAt`, `updatedAt`, `progress`) VALUES
('3ff20b5b-1adf-4b3f-a897-dfabff6eb304', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 'Chapter 2: The Evolution of Eminem\'s Legacy', 'https://www.youtube.com/watch?v=lKJ3gG87Wns', '<h3>Chapter 2: <strong>The Evolution of Eminem\'s Legacy</strong></h3><p>As Eminem’s career progressed, he demonstrated an incredible ability to adapt and evolve, cementing his place as a timeless figure in the music industry. After the meteoric rise following <em>The Marshall Mathers LP</em>, he faced the challenge of sustaining his success while navigating the pressures of fame, personal turmoil, and the ever-changing landscape of hip-hop.</p><p>In 2002, Eminem released <em>The Eminem Show</em>, a deeply introspective album that highlighted his growth as an artist and a person. Tracks like \"Without Me,\" \"Sing for the Moment,\" and \"Hailie’s Song\" balanced humor, raw emotion, and sharp social commentary. The album won the Grammy for Best Rap Album and solidified his ability to blend commercial appeal with artistic depth.</p><p>Simultaneously, Eminem ventured into acting with <em>8 Mile</em>, a semi-autobiographical film about a young rapper navigating the challenges of poverty, race, and self-doubt. The movie’s success was amplified by its soundtrack, particularly the anthem \"Lose Yourself,\" which won an Academy Award and became an enduring symbol of perseverance and seizing opportunity.</p><p>However, success came at a cost. By the mid-2000s, Eminem faced struggles with addiction, the loss of close friends like Proof, and waning creative motivation. His 2004 album <em>Encore</em> received mixed reviews, signaling a period of turbulence. Yet, this chapter of vulnerability and self-doubt only added to the depth of his legacy.</p><p>In 2009, Eminem made a triumphant return with <em>Relapse</em>, his first studio album in five years. It was a raw exploration of his battle with addiction and his journey toward recovery. While some criticized the album\'s darker themes, it showcased his technical brilliance and willingness to confront his demons. This was followed by <em>Recovery</em> in 2010, an album that resonated deeply with listeners for its themes of redemption and resilience. Tracks like \"Not Afraid\" and \"Love the Way You Lie\" reflected a more mature Eminem, committed to growth and introspection.</p><p>As hip-hop evolved, Eminem embraced new challenges to remain relevant. In 2013, he released <em>The Marshall Mathers LP 2</em>, a sequel to his classic album, which paid homage to his roots while showcasing his evolution as an artist. With hits like \"Rap God\" and \"The Monster\" featuring Rihanna, he proved his ability to compete with the new generation of artists while retaining his unique identity.</p><p>The latter years of Eminem’s career have been characterized by his defiance of expectations. Albums like <em>Kamikaze</em> (2018) and <em>Music to Be Murdered By</em> (2020) showed that he could still dominate the charts and spark conversations. Eminem’s music continued to evolve, addressing contemporary issues, criticizing his detractors, and reflecting on his legacy.</p><p>Beyond music, Eminem’s impact has extended to philanthropy and mentorship. He has supported various causes through the Marshall Mathers Foundation and helped nurture upcoming artists through Shady Records. His influence can be seen in the countless rappers who cite him as an inspiration, proving that his legacy transcends generations.</p><p>Eminem’s journey from a young dreamer in Detroit to a global icon has been one of constant reinvention and resilience. With each chapter of his life, he has reaffirmed his status as not just a rapper, but a cultural phenomenon.</p>', 2, '2025-01-03 20:18:18', '2025-01-04 17:40:03', NULL),
('4134a928-2e38-4286-8eab-b51b31f1b4b4', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 'Chapter 1: Eminem\'s legacy', 'https://www.youtube.com/watch?v=YVkUvmDQ3HY', '<p>Eminem, born Marshall Bruce Mathers III on October 17, 1972, is one of the most influential and celebrated artists in the history of hip-hop. Hailing from Detroit, Michigan, his journey to superstardom is a testament to resilience, talent, and an unapologetic embrace of his struggles. Widely known as the \"Rap God,\" Eminem’s lyrical genius, rapid-fire delivery, and raw storytelling have earned him accolades across the globe.</p><p>Eminem’s breakthrough came in 1999 with <em>The Slim Shady LP</em>, an album that introduced the world to his alter ego, Slim Shady, characterized by dark humor and provocative themes. Tracks like \"My Name Is\" captured attention for their boldness and creativity. The album won him a Grammy Award for Best Rap Album, a harbinger of the monumental success that would follow.</p><p>In 2000, <em>The Marshall Mathers LP</em> elevated his status from rising star to hip-hop legend. It became one of the fastest-selling albums in U.S. history, featuring hits like \"Stan\" and \"The Real Slim Shady.\" The album showcased Eminem’s ability to merge intricate rhymes with profound narratives, delving into his struggles with fame, family, and inner demons.</p><p>Eminem\'s career has been marked by his openness about personal challenges. Songs like \"Mockingbird\" and \"Cleanin’ Out My Closet\" offer raw insights into his tumultuous relationship with his mother and his role as a father. His candidness about addiction and mental health, particularly in albums like <em>Relapse</em> and <em>Recovery</em>, resonates with fans who appreciate his authenticity.</p><p>Despite controversy surrounding his lyrics, often criticized for being explicit or offensive, Eminem has defended his artistry as a reflection of his reality and a means of self-expression. Over the years, his work has sparked conversations about freedom of speech, mental health, and societal issues, underscoring his impact beyond music.</p><p>Eminem’s accolades include 15 Grammy Awards, an Academy Award for Best Original Song for \"Lose Yourself\" from the movie <em>8 Mile</em>, and induction into the Rock and Roll Hall of Fame in 2022. His influence extends beyond music, inspiring countless artists and contributing to hip-hop\'s mainstream acceptance.</p><p>One of the defining features of Eminem’s artistry is his technical prowess. His ability to craft multi-syllabic rhymes, weave complex wordplay, and maintain a relentless flow has cemented his reputation as one of the greatest rappers of all time. Songs like \"Rap God\" and \"Godzilla\" showcase his unmatched speed and dexterity, pushing the boundaries of what’s possible in rap.</p><p>Eminem’s legacy is not just about record sales or awards. It’s about resilience, transformation, and staying true to oneself in a world that often demands conformity. His story is a reminder that art, at its core, is about authenticity and the courage to share one’s truth. From a kid in Detroit with big dreams to a global icon, Eminem’s journey is a testament to the power of words and the indomitable human spirit.</p>', 1, '2025-01-03 20:13:19', '2025-01-04 17:40:03', NULL),
('a81e5386-bc5f-4fdb-b798-3133738d8f9f', '7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 'Revolutionary MinecraftLifeHacks: Epic Builds & Adventures!', 'https://www.youtube.com/watch?v=Y4gnMMB3ax8&list=PLMJCfsZcYmHWI4ZvMbFZl3_9UX9lFGWY5', '<body>\n  <div class=\"container\">\n    <h1 class=\"main-title\">? Welcome to the Ultimate Guide for Minecraft Enthusiasts! ?</h1>\n    <p class=\"intro\">\n      ? In this <strong>mind-blowing video</strong>, we unveil a collection of <strong>revolutionary life hacks</strong> that will take your Minecraft skills to a whole new level.\n    </p>\n    <p class=\"intro\">\n      ✨ <strong>Join us on an adventure</strong> as we share <strong>game-changing secrets</strong> and <strong>pro tips</strong> that top gaming YouTubers swear by. Prepare to be amazed as we reveal:\n    </p>\n    <ul class=\"features\">\n      <li>?️ <strong>Jaw-dropping building techniques</strong></li>\n      <li>? <strong>Hidden tricks</strong></li>\n      <li>? <strong>Expert strategies</strong></li>\n    </ul>\n    <p class=\"intro\">\n      ? <strong>Transform your Minecraft world</strong> with hacks that ignite creativity and unlock endless possibilities!\n    </p>\n    <div class=\"highlight-box\">\n      <h2>? What You\'ll Learn:</h2>\n      <ul class=\"features\">\n        <li>Create <strong>stunning structures</strong> effortlessly</li>\n        <li>Uncover <strong>hidden treasures</strong></li>\n        <li>Optimize <strong>resource gathering</strong></li>\n        <li>Streamline your <strong>redstone contraptions</strong></li>\n        <li>Conquer the <strong>Nether</strong> like a true champion</li>\n      </ul>\n    </div>\n    <p class=\"intro\">\n      ? Dive into the world of <strong>command blocks</strong>, where you\'ll discover the power to create <strong>epic custom maps</strong> and incredible adventures.\n    </p>\n    <p class=\"intro\">\n      ? With <strong>captivating visuals</strong>, <strong>step-by-step demonstrations</strong>, and <strong>insider insights</strong>, this video is a <strong>treasure trove</strong> for Minecraft enthusiasts of all levels.\n    </p>\n    <p class=\"intro\">\n      ? Join <strong>millions of viewers</strong> who have embraced these life hacks and witnessed <strong>unbelievable transformations</strong> in their gameplay.\n    </p>\n    <div class=\"call-to-action\">\n      <h2>⚡ Get Ready to:</h2>\n      <ul>\n        <li>Level up your Minecraft gameplay</li>\n        <li>Impress your friends</li>\n        <li>Become the <strong>ultimate master</strong> of the blocky world</li>\n      </ul>\n      <p class=\"cta-text\">\n        ? <strong>Don\'t miss out on this epic adventure!</strong> Hit that play button now and unlock the secrets to becoming a <strong>Minecraft legend!</strong>\n      </p>\n    </div>\n  </div>\n</body>', 1, '2024-12-29 17:17:06', '2025-01-03 20:13:44', 0),
('b1db732f-095d-4997-8651-68dd9dd0bb3d', '7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 'The BEST Composter Design in Minecraft (Fully Automatic + HIDDEN) Tutorial', 'https://www.youtube.com/watch?v=0mhQKdlD11s', '<p><strong>Minecraft Tutorial: The BEST Composter Design (Fully Automatic + HIDDEN)</strong></p><p>In Minecraft, composters are a fantastic way to recycle plant materials into bone meal, which can be used for farming and decoration. This tutorial will guide you through creating a fully automatic, hidden composter design that is both efficient and aesthetically pleasing.</p><p><strong>Materials Needed:</strong></p><ul><li><p> Composter</p></li><li><p>Hopper</p></li><li><p>Chest</p></li><li><p>Piston</p></li><li><p>Observer</p></li><li><p>Redstone Torch</p></li><li><p>Redstone Dust</p></li><li><p>Block of your choice (for concealment)</p></li><li><p>Plant materials (e.g., seeds, wheat, leaves)</p></li></ul><p><strong>Step 1: Base Setup</strong></p><ol><li><p>Dig a 3x3 area, two blocks deep. This will house the hidden composter system.</p></li><li><p>Place the chest at the bottom center of the area. This chest will collect the bone meal.</p></li><li><p>Attach the hopper directly above the chest. The hopper will funnel items from the composter into the chest.</p></li></ol><p><strong>Step 2: Installing the Composter</strong></p><ol><li><p>Place the composter directly above the hopper. Any items inserted into the composter will pass through the hopper and into the chest once processed.</p></li></ol><p><strong>Step 3: Automating the System</strong></p><ol><li><p>Behind the composter, place an observer facing the composter. The observer will detect when the composter is full and ready to produce bone meal.</p></li><li><p>Place a block behind the observer to hold the redstone torch.</p></li><li><p>Put the redstone torch on the block behind the observer.</p></li><li><p>Directly above the redstone torch, place a block with redstone dust on top. This redstone dust will power the piston when activated.</p></li></ol><p><strong>Step 4: Piston Activation</strong></p><ol><li><p>Place the piston one block above the composter, facing downwards. When triggered, the piston will push down and empty the composter.</p></li></ol><p><strong>Step 5: Concealing the System</strong></p><ol><li><p>Use blocks of your choice to cover the area around the composter, leaving only the top visible for inserting plant materials.</p></li><li><p>If you want the system to be completely hidden, use trapdoors or carpets to blend it into the environment.</p></li></ol><p><strong>How It Works:</strong></p><ul><li><p>As you place plant materials into the composter, it gradually fills up. Once full, the observer detects this and activates the piston.</p></li><li><p>The piston pushes down, emptying the composter and sending bone meal into the chest via the hopper.</p></li><li><p>The process resets, allowing continuous, hands-free composting.</p></li></ul><p><strong>Tips:</strong></p><ul><li><p>Use hoppers or water streams to funnel excess plant materials directly into the composter for a fully automated farm-to-composter system.</p></li><li><p>Consider connecting multiple composters to maximize bone meal production.</p></li><li><p>Experiment with different designs to ensure the system blends seamlessly with your base.</p></li></ul><p>This hidden, automatic composter design is perfect for survival mode, helping you make the most of your resources while keeping your base neat and organized. Happy crafting!</p>', 2, '2025-01-03 18:15:57', '2025-01-03 20:13:45', NULL),
('ea101d69-d9ac-42b0-aa10-1354506bfd9e', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 'ghkhlk', '', '', 3, '2025-01-04 17:34:22', '2025-01-04 17:36:04', NULL);

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('draft','published','archived','') DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `title`, `description`, `imageUrl`, `instructor`, `duration`, `level`, `rating`, `students`, `createdAt`, `updatedAt`, `status`) VALUES
('3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 'Eminem: The Art and Evolution of a Rap Icon', 'Dive into the extraordinary journey of Marshall Mathers, aka Eminem, one of the most influential artists in hip-hop history. This course explores his groundbreaking albums, lyrical genius, and cultural impact. From his Detroit roots to global superstardom, analyze his storytelling, technical prowess, and the themes of resilience, fame, and redemption in his music. Examine his iconic alter egos, controversies, and role in shaping hip-hop’s mainstream acceptance. Whether you\'re a fan or a scholar of music, this course offers a comprehensive look at the legacy of the \"Rap God\" and his enduring influence on music and culture.', 'https://th.bing.com/th/id/OIP.uMsIOV4rgWa7X7mWRpNCjQHaE7?rs=1&pid=ImgDetMain', '', '', 'BEGINNER', 0, 0, '2025-01-03 20:11:49', '2025-01-04 17:40:03', 'published'),
('7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 'Minecraft mastery', 'Minecraft shikhabo hahaahahhaha', 'https://th.bing.com/th/id/R.935fa4387456f2e47a2f8d1090c64633?rik=2q9sCNxE%2bNCB8g&pid=ImgRaw&r=0', '', '', 'BEGINNER', 0, 0, '2024-12-29 17:11:24', '2025-01-03 20:13:44', 'published');

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
('3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 'fb69e320-c119-4aff-9cc7-cfcdb394d07d'),
('7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 'b094e8a6-7731-4ef8-9c1e-c99fbf6ce47f');

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
('1ddb8104-74df-4e3f-9454-c63201b60d3e', 'b607a245-903d-4297-9ded-f7b3c24fa67a', '7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 0, '2024-12-29 17:17:29', '2024-12-29 17:17:29', '2024-12-29 17:17:29'),
('5704030e-ea80-4d4e-b093-9fd29b5c53c0', 'bb759173-7452-4607-b7b1-68268b6756e0', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 0, '2025-01-05 19:33:52', '2025-01-05 19:33:52', '2025-01-05 19:33:52'),
('8079270a-dd06-408a-995c-0dc4ca5702d3', 'bb759173-7452-4607-b7b1-68268b6756e0', '7ee65d42-a0bd-4d8f-a8f8-3f9a6173bb71', 0, '2025-01-05 19:34:14', '2025-01-05 19:34:14', '2025-01-05 19:34:14'),
('d7f1c526-32fb-4ee3-b6c2-91ef193b2d13', 'b607a245-903d-4297-9ded-f7b3c24fa67a', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 0, '2025-01-03 20:51:36', '2025-01-03 20:51:36', '2025-01-03 20:51:36'),
('ffcc2f06-97c7-454b-ba39-9ed270767905', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', '3e9ebee8-92c1-457d-a6e5-356dd214b5c0', 0, '2025-01-04 18:38:41', '2025-01-04 18:38:41', '2025-01-04 18:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` char(36) NOT NULL,
  `courseId` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE `interest` (
  `id` char(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `icon` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interest`
--

INSERT INTO `interest` (`id`, `name`, `createdAt`, `updatedAt`, `icon`) VALUES
('85dd2bd5-4e22-420e-ac29-9ab2a6eeafc8', 'data-science', '2025-01-03 19:24:48', '2025-01-03 19:24:48', NULL),
('a5cc0b1b-ab04-4b1b-8a2b-54047395876b', 'Marketing', '2024-12-01 20:50:52', '2025-01-03 14:08:59', 'TrendingUp'),
('b094e8a6-7731-4ef8-9c1e-c99fbf6ce47f', 'Games', '2025-01-03 13:03:26', '2025-01-03 13:03:26', 'Gamepad2'),
('f05d4f13-d19e-4816-a0bd-c047e8aa3c93', 'Data Science', '2024-12-01 20:50:52', '2025-01-03 14:08:59', 'Database'),
('f7b30164-b024-11ef-9c26-d8bbc114656c', 'Programming', '2024-12-01 20:43:49', '2025-01-03 14:08:59', 'Code'),
('f7b30a78-b024-11ef-9c26-d8bbc114656c', 'Business', '2024-12-01 20:43:49', '2025-01-03 14:08:59', 'BookOpen'),
('f7b30a9a-b024-11ef-9c26-d8bbc114656c', 'Design', '2024-12-01 20:43:49', '2025-01-03 14:08:59', 'Palette'),
('f7b30abd-b024-11ef-9c26-d8bbc114656c', 'Languages', '2024-12-01 20:43:49', '2025-01-03 14:08:59', 'Globe'),
('fb69e320-c119-4aff-9cc7-cfcdb394d07d', 'Music', '2025-01-03 20:18:18', '2025-01-03 20:18:18', 'FileMusic');

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
('4c8e0121-b72d-11ef-9714-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'New Notificaiton!', 'New notification!', 'success', 1, '2024-12-10 19:31:05'),
('58e27bd0-b196-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'Welcome to CourseKori!', 'Start exploring our courses to begin your learning journey.', 'info', 1, '2024-12-03 16:47:56'),
('58e28338-b196-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'Course Recommendation', 'Based on your interests, check out our new Python course!', 'success', 1, '2024-12-03 16:47:56'),
('85451000-b198-11ef-99ea-d8bbc114656c', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'New', 'Hello there, it is a new notification.', 'info', 1, '2024-12-03 17:03:30'),
('85451000-b198-11ef-99ea-d8bbc114656d', 'b607a245-903d-4297-9ded-f7b3c24fa67a', 'New', 'Hello there, it is a new notification.', 'info', 1, '2024-12-03 17:03:56'),
('baa85206-b72c-11ef-9714-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'Hello there!', 'How you doing?', 'info', 0, '2024-12-10 19:27:00'),
('ef0fc087-b72c-11ef-9714-d8bbc114656c', '1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'Notificaiton!', 'Login successfully!', 'success', 1, '2024-12-10 19:28:28');

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
  `account_settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `payment_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subscriptions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `firstName`, `lastName`, `password`, `createdAt`, `updatedAt`, `profile_picture_url`, `wishlist_count`, `cart_count`, `notifications_count`, `messages_count`, `account_settings`, `payment_methods`, `subscriptions`, `isAdmin`) VALUES
('1a22a52e-c300-4fc0-b5a9-7af24d4d440a', 'ahmad@gmail.com', 'Ahmad', 'Towsif', '$2a$12$0dX9loBiyQ5TdG1tbztp.uW5W7MxeO6iHhh5N3t1OD/1k8ATMxVge', '2024-12-02 20:16:48', '2024-12-02 20:16:48', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('651f8c12-e05e-4d6c-9973-25c5f4e4f928', 'niaz.nafi.rahman@g.bracu.ac.bd', 'Niaz', 'Rahman', '$2a$12$G6N61AJX2k7fal7OBsuRwOAP64kP4rSlBSlU83YSl5RQZdb6W2lhe', '2024-12-02 20:15:19', '2024-12-02 20:15:19', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('9b702254-4f27-4b19-8137-cb7cac0c56f8', 'farruk@gmail.com', 'farruk', 'towsif', '$2a$12$RUuRlIhOGa1mutqZanfqpO8bSlvXrh9CC6TJQEQ81l3luKuo9h/8m', '2024-12-09 16:22:51', '2024-12-09 16:22:51', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'niaz@gmail.com', 'Niaz', 'Rahman', '$2a$12$MRq7kG7gEx/1TGxe4an4D.Ab3rIPdwR/yIxP.5Z69vshQsQn4Bgem', '2024-12-03 16:43:10', '2024-12-03 16:43:10', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('bb759173-7452-4607-b7b1-68268b6756e0', 'ryan@gmail.com', 'ryan', 'gosling', '$2a$12$iQ5CwFGSSGG0und9IhtiXOqON0.157S18QZxSexPMapuhkWzcm80W', '2024-12-09 19:32:59', '2024-12-09 19:32:59', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('eac5ac6a-3197-4889-a825-ab7a2a65d63e', 'mehedi@gmail.com', 'Mehedi', 'Hasan', '$2a$12$jzVvarNkWT2HtLEbgDnA7egWppZyTZlsl1TpgKUgQ5A5yxYUi7FPq', '2024-12-03 04:39:12', '2024-12-03 04:39:12', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 0),
('f62119a4-2779-4286-9bc3-c7eef8f0f313', 'admiin@gmail.com', 'ABCD', 'EFG', '$2a$12$E9Z2e9qJak4JH2SzsqzWye/ebgiUAsQJ9LzJoPGKSuXucPKXpmu4S', '2024-12-09 19:59:19', '2024-12-09 20:04:30', NULL, 0, 0, 0, 0, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_chapter_progress`
--

CREATE TABLE `user_chapter_progress` (
  `id` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `courseId` char(36) NOT NULL,
  `chapterId` char(36) NOT NULL,
  `progress_video` float DEFAULT NULL,
  `score` float DEFAULT NULL,
  `feedback` varchar(400) DEFAULT NULL,
  `progress_mcq` float DEFAULT NULL,
  `enrollmentId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('9b702254-4f27-4b19-8137-cb7cac0c56f8', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('9b702254-4f27-4b19-8137-cb7cac0c56f8', 'f7b30abd-b024-11ef-9c26-d8bbc114656c'),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('b607a245-903d-4297-9ded-f7b3c24fa67a', 'f7b30a9a-b024-11ef-9c26-d8bbc114656c'),
('bb759173-7452-4607-b7b1-68268b6756e0', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('bb759173-7452-4607-b7b1-68268b6756e0', 'f7b30a78-b024-11ef-9c26-d8bbc114656c'),
('eac5ac6a-3197-4889-a825-ab7a2a65d63e', 'f7b30164-b024-11ef-9c26-d8bbc114656c'),
('f62119a4-2779-4286-9bc3-c7eef8f0f313', 'a5cc0b1b-ab04-4b1b-8a2b-54047395876b'),
('f62119a4-2779-4286-9bc3-c7eef8f0f313', 'f7b30164-b024-11ef-9c26-d8bbc114656c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

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
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `userId` (`userId`);

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
-- Indexes for table `user_chapter_progress`
--
ALTER TABLE `user_chapter_progress`
  ADD PRIMARY KEY (`id`,`userId`,`courseId`,`chapterId`,`enrollmentId`),
  ADD KEY `fk_user` (`userId`),
  ADD KEY `fk_course` (`courseId`),
  ADD KEY `fk_chapter` (`chapterId`),
  ADD KEY `fk_enrollment` (`enrollmentId`);

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
-- Constraints for table `chapter`
--
ALTER TABLE `chapter`
  ADD CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_chapter_progress`
--
ALTER TABLE `user_chapter_progress`
  ADD CONSTRAINT `fk_chapter` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_course` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_enrollment` FOREIGN KEY (`enrollmentId`) REFERENCES `enrollment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

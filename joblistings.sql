-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2023 at 10:06 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_board`
--

-- --------------------------------------------------------

--
-- Table structure for table `joblistings`
--

CREATE TABLE `joblistings` (
  `job_id` int(11) NOT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `salary_range` int(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `posted_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `joblistings`
--

INSERT INTO `joblistings` (`job_id`, `employer_id`, `title`, `description`, `requirements`, `salary_range`, `location`, `posted_date`, `expiry_date`) VALUES
(111, 1, 'devloper', 'We\'re seeking an experienced frontend, react engineer to join our engineering team!\r\n\r\nYou\'ll be joining our team of 3 engineers as our specialist in React UI.\r\n\r\nWe think a lot about our craft as engineers. We involve everyone deeply in the product & design cycles, so you have input into what we build and why we\'re building it.\r\n\r\nWe talk to our customers, a lot. Everyone on the team spends time in our public Slack talking to our customers and understanding what they want. We believe in building intuition about our customers, vs. relying only on our own.\r\n\r\nAs an engineering team, we are deeply ambitious. We\'ve built our own ML models, plug-and-play architectures for both cloud and on-prem, use various streams/IoT/interfaces to build experiences for users.', 'java \r\npaython \r\nnode js', 1000, 'Naplus', '2023-05-10', '2023-05-31'),
(222, 2, 'Developer', 'we need java developer ...', 'python \r\nnodejs\r\njavascript', 20000, 'Ramallah', '2023-05-04', '2023-05-14'),
(333, 2, 'Software Engineer', 'Join our team as a software engineer...', 'C++\nJava\nSQL', 30000, 'Ramallah', '2023-05-05', '2023-05-15'),
(444, 1, 'Web Developer', 'Looking for a skilled web developer...', 'HTML\nCSS\nJavaScript', 25000, 'Ramallah', '2023-05-06', '2023-05-16'),
(888, 2, 'Developer', 'We need a Java developer...', 'Python\nNode.js\nJavaScript', 20000, 'Ramallah', '2023-05-04', '2023-05-14');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

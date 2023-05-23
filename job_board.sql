-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 01:33 PM
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
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `job_seeker_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `job_seeker_id`, `job_id`, `resume_path`, `cover_letter`) VALUES
(5577, 55, 222, 'resume path of app 55 ', 'cover letter of employee updated '),
(5578, 55, 222, 'resume path of app 1 ', 'cover letter of employee 55');

-- --------------------------------------------------------

--
-- Table structure for table `employers`
--

CREATE TABLE `employers` (
  `employer_id` int(11) NOT NULL,
  `root` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employers`
--

INSERT INTO `employers` (`employer_id`, `root`, `contact_info`, `role`, `password`) VALUES
(1, 'ali', 'ali@example.com', 'manager', '65466'),
(2, 'sama', 'sama@example.com', 'engeneer', '856984');

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
  `expiry_date` date DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_logo` varchar(255) NOT NULL,
  `job_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `joblistings`
--

INSERT INTO `joblistings` (`job_id`, `employer_id`, `title`, `description`, `requirements`, `salary_range`, `location`, `posted_date`, `expiry_date`, `company_name`, `company_logo`, `job_url`) VALUES
(111, 1, 'devloper', 'We\'re seeking an experienced frontend, react engineer to join our engineering team!\r\n\r\nYou\'ll be joining our team of 3 engineers as our specialist in React UI.\r\n\r\nWe think a lot about our craft as engineers. We involve everyone deeply in the product & design cycles, so you have input into what we build and why we\'re building it.\r\n\r\nWe talk to our customers, a lot. Everyone on the team spends time in our public Slack talking to our customers and understanding what they want. We believe in building intuition about our customers, vs. relying only on our own.\r\n\r\nAs an engineering team, we are deeply ambitious. We\'ve built our own ML models, plug-and-play architectures for both cloud and on-prem, use various streams/IoT/interfaces to build experiences for users.', 'java \r\npaython \r\nnode js', 1000, 'Naplus', '2023-05-10', '2023-05-31', '', '', ''),
(333, 2, 'Software Engineer', 'Join our team as a software engineer...', 'C++\nJava\nSQL', 30000, 'Ramallah', '2023-05-05', '2023-05-15', '', '', ''),
(444, 1, 'Web Developer', 'Looking for a skilled web developer...', 'HTML\nCSS\nJavaScript', 25000, 'Ramallah', '2023-05-06', '2023-05-16', '', '', ''),
(888, 2, 'Developer', 'We need a Java developer...', 'Python\nNode.js\nJavaScript', 20000, 'Ramallah', '2023-05-04', '2023-05-14', '', '', ''),
(999, 2, 'devloper', 'We\'re seeking an experienced frontend, react engineer to join our engineering team!\r\n\r\nYou\'ll be joining our team of 3 engineers as our specialist in React UI.\r\n\r\nWe think a lot about our craft as engineers. We involve everyone deeply in the product & design cycles, so you have input into what we build and why we\'re building it.\r\n\r\nWe talk to our customers, a lot. Everyone on the team spends time in our public Slack talking to our customers and understanding what they want. We believe in building intuition about our customers, vs. relying only on our own.\r\n\r\nAs an engineering team, we are deeply ambitious. We\'ve built our own ML models, plug-and-play architectures for both cloud and on-prem, use various streams/IoT/interfaces to build experiences for users.', 'java \r\npaython \r\nnode js', 555, 'Naplus', '2023-05-09', '2023-05-30', '', '', '');

-- --------------------------------------------------------

--
-- Dumping data for table `joblistings`
--

CREATE TABLE `jobseekers` (
  `job_seeker_id` int(11) NOT NULL,
  `root` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobseekers`
--

INSERT INTO `jobseekers` (`job_seeker_id`, `root`, `contact_info`, `password`) VALUES
(2, 'Rua123', 'Rua@example.com', '123457'),
(3, 'sara', 'sara@example.com', '55555'),
(4, 'Arwa67766', 'Arwa6644@example.com', '4868'),
(55, 'asdfg', 'asdfg@example.com', '55585vdfgh'),
(88, 'Arwa', 'example@example.com', '485698'),
(999547, 'Ahmad', 'Ahmad@example.com', '555');

-- --------------------------------------------------------

--
-- Table structure for table `savedsearches`
--

CREATE TABLE `savedsearches` (
  `search_id` int(11) NOT NULL,
  `job_seeker_id` int(11) DEFAULT NULL,
  `search_title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `salary_range` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `savedsearches`
--

INSERT INTO `savedsearches` (`search_id`, `job_seeker_id`, `search_title`, `location`, `salary_range`) VALUES
(1, 2, 'Software Engineer Jobs', 'San Francisco', 100000),
(2, 3, 'Web Developer Positions', 'New York', 80000),
(3, 4, 'Data Analyst Openings', 'Chicago', 60000),
(191919, 2, 'Devloper jops', 'Nublus', 5000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `job_seeker_id` (`job_seeker_id`),
  ADD KEY `job_id` (`job_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5579;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

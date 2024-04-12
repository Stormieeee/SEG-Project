-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2024 at 08:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rbms1`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking id description`
--

CREATE TABLE `booking id description` (
  `Booking ID` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start Time` time DEFAULT NULL,
  `End Time` time DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking id description`
--

INSERT INTO `booking id description` (`Booking ID`, `Description`, `Date`, `Start Time`, `End Time`, `capacity`, `Comment`) VALUES
('BD24S', 'Group work', '2024-03-20', '09:00:00', '12:59:00', 40, NULL),
('8N3PZ', 'Study', '2024-03-18', '14:00:00', '16:59:00', 40, NULL),
('R72BG', 'Meeting', '2024-03-19', '10:00:00', '13:59:00', 40, NULL),
('K1ET2', 'Event', '2024-03-20', '09:00:00', '11:59:00', 40, NULL),
('6D0A8', 'Group work', '2024-03-21', '13:00:00', '15:59:00', 40, NULL),
('Z5WQ9', 'Study', '2024-03-20', '12:00:00', '13:59:00', 40, NULL),
('P7L9C', 'Study', '2024-03-23', '11:00:00', '14:59:00', 40, NULL),
('N4XI6', 'Study', '2024-03-24', '08:00:00', '10:59:00', 40, NULL),
('U9F5H', 'Group work', '2024-03-26', '10:00:00', '12:59:00', 40, NULL),
('V2G6Y', 'Meeting', '2024-03-27', '13:00:00', '15:59:00', 40, NULL),
('I1T3J', 'Meeting', '2024-03-28', '11:00:00', '14:59:00', 40, NULL),
('H4K8O', 'Group work', '2024-03-29', '09:00:00', '11:59:00', 40, NULL),
('UzYRO', 'Study', '2024-04-23', '13:00:00', '15:59:00', 15, 'This is a test'),
('hHYCP', 'Study', '2024-04-23', '13:00:00', '15:59:00', 15, 'This is a test'),
('ViWib', 'Study', '2024-05-13', '15:00:00', '15:59:00', 15, 'Accepted as a test'),
('Igkg9', 'This should accept', '2024-03-31', '13:00:00', '14:59:00', 20, 'can i approve this'),
('g903J', 'yes', '2024-04-12', '10:00:00', '11:59:00', 20, 'I have accepted');

-- --------------------------------------------------------

--
-- Table structure for table `booking list`
--

CREATE TABLE `booking list` (
  `Booking ID` varchar(255) NOT NULL,
  `User ID` varchar(255) DEFAULT NULL,
  `Room ID` varchar(255) DEFAULT NULL,
  `handler` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking list`
--

INSERT INTO `booking list` (`Booking ID`, `User ID`, `Room ID`, `handler`) VALUES
('6D0A8', 'zzy1a21@soton.ac.uk', '3R011', 'zzy1a21@soton.ac.uk'),
('8N3PZ', 'ap1a21@soton.ac.uk', '3R009', 'zzy1a21@soton.ac.uk'),
('BD24S', 'ap1a21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk'),
('g903J', 'ap1a21@soton.ac.uk', '3R006', 'System'),
('H4K8O', 'cht1c22@soton.ac.uk', '3R018', 'zzy1a21@soton.ac.uk'),
('hHYCP', 'ap1a21@soton.ac.uk', '3R022', 'zzy1a21@soton.ac.uk'),
('I1T3J', 'cht1c22@soton.ac.uk', '3R017', 'zzy1a21@soton.ac.uk'),
('Igkg9', 'ap1a21@soton.ac.uk', '3R017', 'zzy1a21@soton.ac.uk'),
('K1ET2', 'zzy1a21@soton.ac.uk', '3R009', 'zzy1a21@soton.ac.uk'),
('N4XI6', 'jyi1n21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk'),
('P7L9C', 'psbs1a21@soton.ac.uk', '3R012', 'zzy1a21@soton.ac.uk'),
('R72BG', 'ap1a21@soton.ac.uk', '3R009', 'zzy1a21@soton.ac.uk'),
('U9F5H', 'jyi1n21@soton.ac.uk', '3R015', 'zzy1a21@soton.ac.uk'),
('UzYRO', 'ap1a21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk'),
('V2G6Y', 'jyi1n21@soton.ac.uk', '3R016', 'zzy1a21@soton.ac.uk'),
('ViWib', 'ap1a21@soton.ac.uk', '3R023', 'zzy1a21@soton.ac.uk'),
('Z5WQ9', 'psbs1a21@soton.ac.uk', '3R011', 'zzy1a21@soton.ac.uk');

-- --------------------------------------------------------

--
-- Table structure for table `booking rejects`
--

CREATE TABLE `booking rejects` (
  `Reject ID` varchar(255) NOT NULL,
  `User ID` varchar(255) DEFAULT NULL,
  `Room ID` varchar(255) DEFAULT NULL,
  `handler` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking rejects`
--

INSERT INTO `booking rejects` (`Reject ID`, `User ID`, `Room ID`, `handler`) VALUES
('7Nw0m', 'ap1a21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk'),
('clOlK', 'ap1a21@soton.ac.uk', '3R026', 'System'),
('S4Wvr', 'ap1a21@soton.ac.uk', '3R011', 'zzy1a21@soton.ac.uk'),
('y3viy', 'ap1a21@soton.ac.uk', '3R006', 'System'),
('yaizK', 'jyi1n21@soton.ac.uk', '3R014', 'System');

-- --------------------------------------------------------

--
-- Table structure for table `booking rejects description`
--

CREATE TABLE `booking rejects description` (
  `Reject ID` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start Time` time DEFAULT NULL,
  `End Time` time DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking rejects description`
--

INSERT INTO `booking rejects description` (`Reject ID`, `Description`, `Date`, `Start Time`, `End Time`, `Capacity`, `Comment`) VALUES
('S4Wvr', 'Test case', '2024-03-21', '13:00:00', '14:59:00', 40, 'Dont feel like it'),
('7Nw0m', 'zoom call', '2024-03-26', '14:00:00', '20:59:00', 5, 'I want to cancel this ew'),
('clOlK', 'Meeting for SEG', '2024-03-20', '13:00:00', '13:59:00', 15, 'I have rejected'),
('yaizK', 'Meeting', '2024-03-20', '10:00:00', '10:59:00', 40, 'I want to remove u'),
('y3viy', 'yes', '2024-03-12', '09:00:00', '10:59:00', 15, 'Booking declined automatically as it\'s past the scheduled date.');

-- --------------------------------------------------------

--
-- Table structure for table `booking request`
--

CREATE TABLE `booking request` (
  `Request ID` varchar(255) NOT NULL,
  `User ID` varchar(255) DEFAULT NULL,
  `Room ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking request description`
--

CREATE TABLE `booking request description` (
  `Request ID` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start Time` time DEFAULT NULL,
  `End Time` time DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `Booking ID` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Text` varchar(255) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`Booking ID`, `Title`, `Text`, `Active`) VALUES
('BD24S', 'Complain', 'This is a problem', 1);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Room ID` varchar(255) DEFAULT NULL,
  `Equipment` varchar(255) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Room ID`, `Equipment`, `Quantity`) VALUES
('3R006', 'Table', 8),
('3R006', 'Chair', 30),
('3R006', 'Microphone', 2),
('3R006', 'Projector', 1),
('3R006', 'Whiteboard', 2);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `Room ID` varchar(255) NOT NULL,
  `Room Type` varchar(255) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Section` varchar(255) DEFAULT NULL,
  `StudentAccess` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`Room ID`, `Room Type`, `Capacity`, `Section`, `StudentAccess`) VALUES
('3R002', 'Lecture Room', 30, '3R', 1),
('3R003', 'Lecture Room', 30, '3R', 1),
('3R004', 'Lecture Room', 30, '3R', 1),
('3R005', 'Event room', 55, '3R', 0),
('3R006', 'Lecture Room', 30, '3R', 1),
('3R009', 'Lecture Room', 40, '3R', 1),
('3R010', 'Mechanical Workshop', NULL, '3R', 0),
('3R011', 'Lecture Room', 40, '3R', 1),
('3R012', 'Green Engineering Laboratory', NULL, '3R', 0),
('3R013', 'Materials & Structures Laboratory', NULL, '3R', 0),
('3R014', 'Aerospace Laboratory', NULL, '3R', 0),
('3R015', 'Design Studio', 48, '3R', 1),
('3R016', 'Mechanics Laboratory', NULL, '3R', 0),
('3R017', 'Lecture Room', 55, '3R', 1),
('3R018', 'Lecture Room', 40, '3R', 1),
('3R019', 'Lecture Room', 55, '3R', 1),
('3R020', 'Lecture Room', 40, '3R', 1),
('3R021', 'Lecture Room', 56, '3R', 1),
('3R022', 'Lecture Room', 55, '3R', 1),
('3R023', 'Computer Science Laboratory', NULL, '3R', 1),
('3R024', 'Lecture Room', 55, '3R', 1),
('3R025', 'Lecture Room', 55, '3R', 1),
('3R026', 'Lecture Room', 100, '3R', 1),
('3R027', 'Computer Science Laboratory', NULL, '3R', 1),
('3R028', 'Computer Science Laboratory', NULL, '3R', 1),
('3R029', 'Computer Science Laboratory', NULL, '3R', 1),
('3R030', 'Lecture Room', 56, '3R', 1),
('3R031', 'Lecture Room', 30, '3R', 1),
('3R032', 'Engineering Foundation Laboratory 1', NULL, '3R', 0),
('3R033', 'Engineering Foundation Laboratory 2', NULL, '3R', 0),
('3R034', 'Engineering Foundation Laboratory 3', NULL, '3R', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user login`
--

CREATE TABLE `user login` (
  `User ID` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `OTPKey` int(11) DEFAULT NULL,
  `LoggedIn` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user login`
--

INSERT INTO `user login` (`User ID`, `Password`, `OTPKey`, `LoggedIn`) VALUES
('ap1a21@soton.ac.uk', 'password1', 57782, 1),
('cht1c22@soton.ac.uk', 'password5', NULL, 0),
('jyi1n21@soton.ac.uk', 'password2', NULL, 0),
('psbs1a21@soton.ac.uk', 'password3', NULL, 0),
('zzy1a21@soton.ac.uk', 'password4', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user roles`
--

CREATE TABLE `user roles` (
  `Role ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user roles`
--

INSERT INTO `user roles` (`Role ID`, `Name`) VALUES
(1, 'Student'),
(2, 'Faculty'),
(3, 'SAS Staff Member'),
(4, 'Property Manager'),
(5, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `User ID` varchar(255) NOT NULL,
  `Role ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`User ID`, `Role ID`) VALUES
('ap1a21@soton.ac.uk', 1),
('jyi1n21@soton.ac.uk', 2),
('cht1c22@soton.ac.uk', 3),
('zzy1a21@soton.ac.uk', 4),
('psbs1a21@soton.ac.uk', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking id description`
--
ALTER TABLE `booking id description`
  ADD KEY `Booking ID` (`Booking ID`);

--
-- Indexes for table `booking list`
--
ALTER TABLE `booking list`
  ADD PRIMARY KEY (`Booking ID`),
  ADD KEY `User ID` (`User ID`),
  ADD KEY `Room ID` (`Room ID`);

--
-- Indexes for table `booking rejects`
--
ALTER TABLE `booking rejects`
  ADD PRIMARY KEY (`Reject ID`),
  ADD KEY `User ID` (`User ID`),
  ADD KEY `Room ID` (`Room ID`);

--
-- Indexes for table `booking rejects description`
--
ALTER TABLE `booking rejects description`
  ADD KEY `Reject ID` (`Reject ID`);

--
-- Indexes for table `booking request`
--
ALTER TABLE `booking request`
  ADD PRIMARY KEY (`Request ID`),
  ADD KEY `User ID` (`User ID`),
  ADD KEY `Room ID` (`Room ID`);

--
-- Indexes for table `booking request description`
--
ALTER TABLE `booking request description`
  ADD KEY `Request ID` (`Request ID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD KEY `Booking ID` (`Booking ID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`Room ID`);

--
-- Indexes for table `user login`
--
ALTER TABLE `user login`
  ADD PRIMARY KEY (`User ID`);

--
-- Indexes for table `user roles`
--
ALTER TABLE `user roles`
  ADD PRIMARY KEY (`Role ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User ID`),
  ADD KEY `Role ID` (`Role ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking id description`
--
ALTER TABLE `booking id description`
  ADD CONSTRAINT `booking id description_ibfk_1` FOREIGN KEY (`Booking ID`) REFERENCES `booking list` (`Booking ID`);

--
-- Constraints for table `booking list`
--
ALTER TABLE `booking list`
  ADD CONSTRAINT `booking list_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `users` (`User ID`),
  ADD CONSTRAINT `booking list_ibfk_2` FOREIGN KEY (`Room ID`) REFERENCES `room` (`Room ID`);

--
-- Constraints for table `booking rejects`
--
ALTER TABLE `booking rejects`
  ADD CONSTRAINT `booking rejects_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `users` (`User ID`),
  ADD CONSTRAINT `booking rejects_ibfk_2` FOREIGN KEY (`Room ID`) REFERENCES `room` (`Room ID`);

--
-- Constraints for table `booking rejects description`
--
ALTER TABLE `booking rejects description`
  ADD CONSTRAINT `booking rejects description_ibfk_1` FOREIGN KEY (`Reject ID`) REFERENCES `booking rejects` (`Reject ID`);

--
-- Constraints for table `booking request`
--
ALTER TABLE `booking request`
  ADD CONSTRAINT `booking request_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `users` (`User ID`),
  ADD CONSTRAINT `booking request_ibfk_2` FOREIGN KEY (`Room ID`) REFERENCES `room` (`Room ID`);

--
-- Constraints for table `booking request description`
--
ALTER TABLE `booking request description`
  ADD CONSTRAINT `booking request description_ibfk_1` FOREIGN KEY (`Request ID`) REFERENCES `booking request` (`Request ID`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`Booking ID`) REFERENCES `booking list` (`Booking ID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Role ID`) REFERENCES `user roles` (`Role ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

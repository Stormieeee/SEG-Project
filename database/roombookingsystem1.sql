-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2024 at 03:24 PM
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
-- Database: `roombookingsystem1`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking id description`
--

CREATE TABLE `booking id description` (
  `Booking ID` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start Time` time DEFAULT NULL,
  `End Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking id description`
--

INSERT INTO `booking id description` (`Booking ID`, `Description`, `Date`, `Start Time`, `End Time`) VALUES
('BK001', 'Meeting with faculty', '2024-03-12', '10:00:00', '12:59:00'),
('BK002', 'Discussion on research project', '2024-03-13', '11:00:00', '13:59:00'),
('BK003', 'Seminar preparation', '2024-03-14', '14:00:00', '16:59:00'),
('BK004', 'Team meeting', '2024-03-15', '15:00:00', '17:59:00'),
('BK005', 'Study group session', '2024-03-16', '17:00:00', '19:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `booking list`
--

CREATE TABLE `booking list` (
  `Booking ID` varchar(255) NOT NULL,
  `User ID` varchar(255) DEFAULT NULL,
  `Room ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking list`
--

INSERT INTO `booking list` (`Booking ID`, `User ID`, `Room ID`) VALUES
('BK001', 'ap1a21@soton.ac.uk', 'A101'),
('BK002', 'ap2b22@soton.ac.uk', 'B202'),
('BK003', 'ap3c23@soton.ac.uk', 'C303'),
('BK004', 'ap4d24@soton.ac.uk', 'D404'),
('BK005', 'ap5e25@soton.ac.uk', 'E505');

-- --------------------------------------------------------

--
-- Table structure for table `booking request`
--

CREATE TABLE `booking request` (
  `Request ID` int(11) NOT NULL,
  `User ID` varchar(255) DEFAULT NULL,
  `Room ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking request`
--

INSERT INTO `booking request` (`Request ID`, `User ID`, `Room ID`) VALUES
(1, 'ap1a21@soton.ac.uk', 'A101'),
(2, 'ap2b22@soton.ac.uk', 'B202'),
(3, 'ap3c23@soton.ac.uk', 'C303'),
(4, 'ap4d24@soton.ac.uk', 'D404'),
(5, 'ap5e25@soton.ac.uk', 'E505'),
(6, 'ap1a21@soton.ac.uk', 'E505');

-- --------------------------------------------------------

--
-- Table structure for table `booking request description`
--

CREATE TABLE `booking request description` (
  `Request ID` int(11) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start Time` time DEFAULT NULL,
  `End Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking request description`
--

INSERT INTO `booking request description` (`Request ID`, `Description`, `Date`, `Start Time`, `End Time`) VALUES
(1, 'Meeting with faculty', '2024-03-12', '10:00:00', '12:00:00'),
(2, 'Discussion on research project', '2024-03-13', '11:00:00', '13:00:00'),
(3, 'Seminar preparation', '2024-03-14', '14:00:00', '16:00:00'),
(4, 'Team meeting', '2024-03-15', '15:00:00', '17:00:00'),
(5, 'Study group session', '2024-03-16', '17:00:00', '19:00:00'),
(6, 'study', '2024-03-13', '14:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `Feedback ID` varchar(255) NOT NULL,
  `Booking ID` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`Feedback ID`, `Booking ID`, `Description`) VALUES
('F001', 'BK001', 'Great meeting, everything went smoothly'),
('F002', 'BK002', 'Excellent discussion, very productive'),
('F003', 'BK003', 'Good preparation for the seminar'),
('F004', 'BK004', 'Effective team meeting, resolved issues efficiently'),
('F005', 'BK005', 'Successful study session, covered a lot of material');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Room ID` varchar(255) NOT NULL,
  `Equipment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Room ID`, `Equipment`) VALUES
('A101', 'Projector, Whiteboard'),
('B202', 'Projector, Tables, Chairs'),
('C303', 'Projector, Conference Table, Chairs'),
('D404', 'Projector, Whiteboard'),
('E505', 'Study Desks, Chairs');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `Room ID` varchar(255) NOT NULL,
  `Room Type` varchar(255) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Floor` int(11) DEFAULT NULL,
  `Access` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`Room ID`, `Room Type`, `Capacity`, `Floor`, `Access`) VALUES
('A101', 'Lecture Hall', 100, 2, 1),
('B202', 'Classroom', 50, 3, 1),
('C303', 'Conference Room', 20, 3, 2),
('D404', 'Meeting Room', 10, 3, 2),
('E505', 'Study Room', 5, 2, 3);

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
('ap1a21@soton.ac.uk', '111', 72756, 0),
('ap3c23@soton.ac.uk', 'password3', 98765, 0),
('ap4d24@soton.ac.uk', 'password4', 56789, 0),
('ap5e25@soton.ac.uk', 'password5', 43210, 0),
('zzy1a21@soton.ac.uk', 'password2', 70878, 1);

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
(3, 'SAS Staff'),
(4, 'Administrator'),
(5, 'Property manager');

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
('ap2b22@soton.ac.uk', 2),
('ap3c23@soton.ac.uk', 3),
('ap4d24@soton.ac.uk', 4),
('ap5e25@soton.ac.uk', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking id description`
--
ALTER TABLE `booking id description`
  ADD PRIMARY KEY (`Booking ID`);

--
-- Indexes for table `booking list`
--
ALTER TABLE `booking list`
  ADD PRIMARY KEY (`Booking ID`),
  ADD KEY `User ID` (`User ID`),
  ADD KEY `Room ID` (`Room ID`);

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
  ADD PRIMARY KEY (`Request ID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`Feedback ID`),
  ADD KEY `Booking ID` (`Booking ID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Room ID`);

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
-- Constraints for table `booking list`
--
ALTER TABLE `booking list`
  ADD CONSTRAINT `booking list_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `users` (`User ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking list_ibfk_2` FOREIGN KEY (`Room ID`) REFERENCES `room` (`Room ID`) ON DELETE CASCADE;

--
-- Constraints for table `booking request`
--
ALTER TABLE `booking request`
  ADD CONSTRAINT `booking request_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `users` (`User ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking request_ibfk_2` FOREIGN KEY (`Room ID`) REFERENCES `room` (`Room ID`) ON DELETE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`Booking ID`) REFERENCES `booking id description` (`Booking ID`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Role ID`) REFERENCES `user roles` (`Role ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2024 at 05:55 AM
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
-- Database: `roombookingfinal`
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
('fL8dSW', 'Group work', '2024-03-14', '09:00:00', '11:59:00', 30, ''),
('16ip4O', 'Project', '2024-03-14', '09:00:00', '16:59:00', 1, 'all the best'),
('rOuJ6J', 'Project', '2024-03-17', '09:00:00', '16:59:00', 1, 'Next time book a smaller room'),
('y9rpTK', 'Classwork', '2024-03-07', '09:00:00', '10:59:00', 3, ''),
('UA3p2C', 'Classwork', '2024-03-07', '14:00:00', '16:59:00', 3, ''),
('K2W2r4', 'Event', '2024-03-07', '16:00:00', '18:59:00', 30, 'Good event'),
('Ni3CmO', 'Event', '2024-03-07', '16:00:00', '18:59:00', 30, 'Good event'),
('XcGwUb', 'Event', '2024-03-02', '16:00:00', '19:59:00', 30, 'Be careful with equipment'),
('KhXZxs', 'Work', '2024-03-09', '16:00:00', '21:59:00', 30, '');

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
('16ip4O', 'ap1a21@soton.ac.uk', '3R026', 'zzy1a21@soton.ac.uk'),
('fL8dSW', 'ap1a21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk '),
('K2W2r4', 'psbs1a21@soton.ac.uk', '3R024', 'cht1c22@soton.ac.uk'),
('KhXZxs', 'ap1a21@soton.ac.uk', '3R028', 'zzy1a21@soton.ac.uk'),
('Ni3CmO', 'ap1a21@soton.ac.uk', '3R027', 'cht1c22@soton.ac.uk'),
('rOuJ6J', 'ap1a21@soton.ac.uk', '3R026', 'zzy1a21@soton.ac.uk'),
('UA3p2C', 'psbs1a21@soton.ac.uk', '3L007', 'zzy1a21@soton.ac.uk'),
('XcGwUb', 'ap1a21@soton.ac.uk', '3R028', 'cht1c22@soton.ac.uk'),
('y9rpTK', 'psbs1a21@soton.ac.uk', '3L003', 'zzy1a21@soton.ac.uk');

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
('F03YT6', 'ap1a21@soton.ac.uk', '3R031', 'System'),
('HMnPlv', 'ap1a21@soton.ac.uk', '3R028', 'zzy1a21@soton.ac.uk'),
('itcwwb', 'ap1a21@soton.ac.uk', '3R006', 'zzy1a21@soton.ac.uk '),
('kDveGR', 'ap1a21@soton.ac.uk', '3R031', 'System'),
('ma1R3x', 'ap1a21@soton.ac.uk', '3R031', 'System'),
('TE1rqg', 'ap1a21@soton.ac.uk', '3R031', 'cht1c22@soton.ac.uk');

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
('itcwwb', 'Group work', '2024-03-14', '09:00:00', '11:59:00', 3, 'Collision'),
('HMnPlv', 'Assignment', '2024-03-09', '16:00:00', '21:59:00', 30, 'Too late for assignment'),
('TE1rqg', 'Hangout', '2024-03-28', '19:00:00', '22:59:00', 8, 'cant book late for hangout'),
('ma1R3x', 'Hangout', '2024-03-24', '19:00:00', '22:59:00', 8, 'Booking declined automatically as it\'s past the scheduled date.'),
('kDveGR', 'Hangout', '2024-03-23', '19:00:00', '22:59:00', 8, 'Booking declined automatically as it\'s past the scheduled date.'),
('F03YT6', 'Hangout', '2024-03-26', '19:00:00', '22:59:00', 8, 'Booking declined automatically as it\'s past the scheduled date.');

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
('KhXZxs', 'Missing Equipment', 'The mics that were said to be there were missing', 1),
('Ni3CmO', 'Light not working', 'The light on the right side of the door isnt working', 1),
('rOuJ6J', 'Door issue', 'The door kept getting stuck when closed', 0);

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
('2L003', 'Whiteboard', 4),
('2L003', 'Projector', 4),
('2L003', 'TV', 1),
('2L003', 'Microphone', 2),
('2L005', 'Whiteboard', 2),
('2L005', 'Projector', 4),
('2L005', 'TV', 0),
('2L005', 'Microphone', 0),
('2L006', 'Whiteboard', 4),
('2L006', 'Projector', 0),
('2L006', 'TV', 4),
('2L006', 'Microphone', 0),
('2L007', 'Whiteboard', 0),
('2L007', 'Projector', 2),
('2L007', 'TV', 1),
('2L007', 'Microphone', 1),
('2L008', 'Whiteboard', 4),
('2L008', 'Projector', 2),
('2L008', 'TV', 1),
('2L008', 'Microphone', 1),
('2L009', 'Whiteboard', 3),
('2L009', 'Projector', 1),
('2L009', 'TV', 0),
('2L009', 'Microphone', 3),
('2L010', 'Whiteboard', 2),
('2L010', 'Projector', 0),
('2L010', 'TV', 4),
('2L010', 'Microphone', 4),
('2L011', 'Whiteboard', 3),
('2L011', 'Projector', 2),
('2L011', 'TV', 1),
('2L011', 'Microphone', 2),
('2L013', 'Whiteboard', 2),
('2L013', 'Projector', 3),
('2L013', 'TV', 4),
('2L013', 'Microphone', 0),
('2L014', 'Whiteboard', 1),
('2L014', 'Projector', 3),
('2L014', 'TV', 0),
('2L014', 'Microphone', 4),
('2L015', 'Whiteboard', 4),
('2L015', 'Projector', 4),
('2L015', 'TV', 1),
('2L015', 'Microphone', 0),
('2L016', 'Whiteboard', 2),
('2L016', 'Projector', 2),
('2L016', 'TV', 2),
('2L016', 'Microphone', 2),
('2L017', 'Whiteboard', 3),
('2L017', 'Projector', 2),
('2L017', 'TV', 4),
('2L017', 'Microphone', 2),
('2L018', 'Whiteboard', 0),
('2L018', 'Projector', 2),
('2L018', 'TV', 1),
('2L018', 'Microphone', 0),
('2L019', 'Whiteboard', 3),
('2L019', 'Projector', 4),
('2L019', 'TV', 1),
('2L019', 'Microphone', 2),
('2L020', 'Whiteboard', 4),
('2L020', 'Projector', 4),
('2L020', 'TV', 3),
('2L020', 'Microphone', 4),
('2L021', 'Whiteboard', 1),
('2L021', 'Projector', 3),
('2L021', 'TV', 1),
('2L021', 'Microphone', 1),
('2L022', 'Whiteboard', 0),
('2L022', 'Projector', 4),
('2L022', 'TV', 3),
('2L022', 'Microphone', 1),
('2L023', 'Whiteboard', 4),
('2L023', 'Projector', 2),
('2L023', 'TV', 4),
('2L023', 'Microphone', 2),
('2L024', 'Whiteboard', 3),
('2L024', 'Projector', 3),
('2L024', 'TV', 2),
('2L024', 'Microphone', 2),
('2R001', 'Whiteboard', 2),
('2R001', 'Projector', 4),
('2R001', 'TV', 4),
('2R001', 'Microphone', 2),
('2R012', 'Whiteboard', 3),
('2R012', 'Projector', 2),
('2R012', 'TV', 2),
('2R012', 'Microphone', 1),
('2R013', 'Whiteboard', 3),
('2R013', 'Projector', 3),
('2R013', 'TV', 3),
('2R013', 'Microphone', 3),
('2R014', 'Whiteboard', 2),
('2R014', 'Projector', 1),
('2R014', 'TV', 4),
('2R014', 'Microphone', 2),
('2R016', 'Whiteboard', 0),
('2R016', 'Projector', 0),
('2R016', 'TV', 2),
('2R016', 'Microphone', 2),
('3L003', 'Whiteboard', 4),
('3L003', 'Projector', 1),
('3L003', 'TV', 3),
('3L003', 'Microphone', 2),
('3L005', 'Whiteboard', 2),
('3L005', 'Projector', 4),
('3L005', 'TV', 4),
('3L005', 'Microphone', 4),
('3L006', 'Whiteboard', 0),
('3L006', 'Projector', 4),
('3L006', 'TV', 1),
('3L006', 'Microphone', 2),
('3L007', 'Whiteboard', 0),
('3L007', 'Projector', 2),
('3L007', 'TV', 2),
('3L007', 'Microphone', 0),
('3L023', 'Whiteboard', 0),
('3L023', 'Projector', 2),
('3L023', 'TV', 0),
('3L023', 'Microphone', 1),
('3L024', 'Whiteboard', 2),
('3L024', 'Projector', 3),
('3L024', 'TV', 0),
('3L024', 'Microphone', 3),
('3L026', 'Whiteboard', 1),
('3L026', 'Projector', 1),
('3L026', 'TV', 1),
('3L026', 'Microphone', 3),
('3R002', 'Whiteboard', 4),
('3R002', 'Projector', 1),
('3R002', 'TV', 2),
('3R002', 'Microphone', 4),
('3R003', 'Whiteboard', 3),
('3R003', 'Projector', 4),
('3R003', 'TV', 4),
('3R003', 'Microphone', 1),
('3R004', 'Whiteboard', 0),
('3R004', 'Projector', 4),
('3R004', 'TV', 1),
('3R004', 'Microphone', 0),
('3R005', 'Whiteboard', 4),
('3R005', 'Projector', 2),
('3R005', 'TV', 4),
('3R005', 'Microphone', 0),
('3R006', 'Whiteboard', 1),
('3R006', 'Projector', 4),
('3R006', 'TV', 4),
('3R006', 'Microphone', 3),
('3R009', 'Whiteboard', 0),
('3R009', 'Projector', 4),
('3R009', 'TV', 3),
('3R009', 'Microphone', 2),
('3R010', 'Whiteboard', 4),
('3R010', 'Projector', 3),
('3R010', 'TV', 0),
('3R010', 'Microphone', 2),
('3R011', 'Whiteboard', 1),
('3R011', 'Projector', 2),
('3R011', 'TV', 2),
('3R011', 'Microphone', 3),
('3R012', 'Whiteboard', 2),
('3R012', 'Projector', 0),
('3R012', 'TV', 0),
('3R012', 'Microphone', 4),
('3R013', 'Whiteboard', 3),
('3R013', 'Projector', 3),
('3R013', 'TV', 4),
('3R013', 'Microphone', 1),
('3R014', 'Whiteboard', 2),
('3R014', 'Projector', 4),
('3R014', 'TV', 4),
('3R014', 'Microphone', 3),
('3R015', 'Whiteboard', 2),
('3R015', 'Projector', 4),
('3R015', 'TV', 1),
('3R015', 'Microphone', 3),
('3R016', 'Whiteboard', 4),
('3R016', 'Projector', 2),
('3R016', 'TV', 1),
('3R016', 'Microphone', 1),
('3R017', 'Whiteboard', 2),
('3R017', 'Projector', 2),
('3R017', 'TV', 0),
('3R017', 'Microphone', 4),
('3R018', 'Whiteboard', 0),
('3R018', 'Projector', 0),
('3R018', 'TV', 4),
('3R018', 'Microphone', 4),
('3R019', 'Whiteboard', 4),
('3R019', 'Projector', 0),
('3R019', 'TV', 4),
('3R019', 'Microphone', 3),
('3R020', 'Whiteboard', 1),
('3R020', 'Projector', 0),
('3R020', 'TV', 2),
('3R020', 'Microphone', 0),
('3R021', 'Whiteboard', 2),
('3R021', 'Projector', 1),
('3R021', 'TV', 4),
('3R021', 'Microphone', 1),
('3R022', 'Whiteboard', 3),
('3R022', 'Projector', 2),
('3R022', 'TV', 4),
('3R022', 'Microphone', 4),
('3R023', 'Whiteboard', 4),
('3R023', 'Projector', 1),
('3R023', 'TV', 3),
('3R023', 'Microphone', 0),
('3R024', 'Whiteboard', 0),
('3R024', 'Projector', 3),
('3R024', 'TV', 0),
('3R024', 'Microphone', 1),
('3R025', 'Whiteboard', 2),
('3R025', 'Projector', 4),
('3R025', 'TV', 4),
('3R025', 'Microphone', 2),
('3R026', 'Whiteboard', 3),
('3R026', 'Projector', 3),
('3R026', 'TV', 3),
('3R026', 'Microphone', 3),
('3R027', 'Whiteboard', 2),
('3R027', 'Projector', 0),
('3R027', 'TV', 3),
('3R027', 'Microphone', 3),
('3R028', 'Whiteboard', 0),
('3R028', 'Projector', 1),
('3R028', 'TV', 2),
('3R028', 'Microphone', 1),
('3R029', 'Whiteboard', 4),
('3R029', 'Projector', 0),
('3R029', 'TV', 0),
('3R029', 'Microphone', 2),
('3R030', 'Whiteboard', 2),
('3R030', 'Projector', 4),
('3R030', 'TV', 1),
('3R030', 'Microphone', 4),
('3R031', 'Whiteboard', 4),
('3R031', 'Projector', 1),
('3R031', 'TV', 1),
('3R031', 'Microphone', 2),
('3R032', 'Whiteboard', 3),
('3R032', 'Projector', 2),
('3R032', 'TV', 3),
('3R032', 'Microphone', 2),
('3R033', 'Whiteboard', 3),
('3R033', 'Projector', 0),
('3R033', 'TV', 1),
('3R033', 'Microphone', 1),
('3R034', 'Whiteboard', 2),
('3R034', 'Projector', 2),
('3R034', 'TV', 1),
('3R034', 'Microphone', 3);

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
('2L003', 'Meeting Room', 10, '2L', 1),
('2L005', 'Breakout Room', 4, '2L', 1),
('2L006', 'Breakout Room', 4, '2L', 1),
('2L007', 'Breakout Room', 4, '2L', 1),
('2L008', 'Electronics Laboratory', 100, '2L', 0),
('2L009', 'Electrical Laboratory', 80, '2L', 0),
('2L010', 'UoSM Turing Laboratory', 80, '2L', 0),
('2L011', 'UoSM Laboratory', 20, '2L', 0),
('2L013', 'Breakout Room', 6, '2L', 1),
('2L014', 'Breakout Room', 8, '2L', 1),
('2L015', 'Breakout Room', 2, '2L', 1),
('2L016', 'Breakout Room', 2, '2L', 1),
('2L017', 'Breakout Room', 8, '2L', 1),
('2L018', 'Breakout Room', 8, '2L', 1),
('2L019', 'Advances Characterisation Reserach Laboratory', 40, '2L', 0),
('2L020', 'Laboratory', 80, '2L', 0),
('2L021', 'Future spacing', 100, '2L', 0),
('2L022', 'Future spacing', 100, '2L', 0),
('2L023', 'Future spacing', 100, '2L', 0),
('2L024', 'Future spacing', 100, '2L', 0),
('2R001', 'Lecture Hall', 100, '2R', 1),
('2R012', 'Lecture Hall', 100, '2R', 1),
('2R013', 'Lecture Hall', 100, '2R', 1),
('2R014', 'Lecture Hall', 200, '2R', 1),
('2R016', 'Tiered Lecture Hall', 200, '2R', 0),
('3L003', 'Lecture Room', 10, '3L', 0),
('3L005', 'Breakout Room', 4, '3L', 0),
('3L006', 'Breakout Room', 4, '3L', 0),
('3L007', 'Breakout Room', 4, '3L', 0),
('3L023', 'Board Room', 12, '3L', 0),
('3L024', 'Executive Education Suite', 16, '3L', 0),
('3L026', 'Meeting Room', 15, '3L', 0),
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
('ap1a21@soton.ac.uk', 'ZOL_Ao9AxfQ0r7fe-wGpXw==', NULL, NULL),
('cht1c22@soton.ac.uk', 'MA7CovpKCKO6MAo67-_I9g==', NULL, NULL),
('jyi1n21@soton.ac.uk', '51jPPpeNMMay-0oHp_4ATg==', NULL, NULL),
('M.N.Zamri@soton.ac.uk', 'qhqSv7NCNNeAsqDgyIRiMg==', NULL, NULL),
('mt1e22@soton.ac.uk', '7jO4ZsxWatTzEbgIxHTTOQ==', NULL, NULL),
('psbs1a21@soton.ac.uk', '7BZVgdNtfv-fSQhJu1RXzw==', NULL, NULL),
('Rajesh.Yadav@southampton.ac.uk', 'WhvKjCsNWI7qH-u2F2XQbw==', NULL, NULL),
('zzy1a21@soton.ac.uk ', 'OCI0Vj1eW3x1PknvFfMm8Q==', NULL, NULL);

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
  `Role ID` int(11) DEFAULT NULL,
  `profile_picture` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`User ID`, `Role ID`, `profile_picture`) VALUES
('ap1a21@soton.ac.uk', 1, NULL),
('cht1c22@soton.ac.uk', 4, NULL),
('jyi1n21@soton.ac.uk', 5, NULL),
('M.N.Zamri@soton.ac.uk', 2, NULL),
('mt1e22@soton.ac.uk', 1, NULL),
('psbs1a21@soton.ac.uk', 1, NULL),
('Rajesh.Yadav@southampton.ac.uk', 2, NULL),
('zzy1a21@soton.ac.uk ', 3, NULL);

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
-- Constraints for table `booking rejects`
--
ALTER TABLE `booking rejects`
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

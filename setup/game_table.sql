-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.9.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table flight_game.game
CREATE TABLE IF NOT EXISTS `game` (
  `gameId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `score` decimal(20,6) DEFAULT NULL,
  `co2consumed` decimal(20,6) DEFAULT NULL,
  `co2benefit` int(11) DEFAULT NULL,
  `co2budget` decimal(20,6) DEFAULT NULL,
  `current_location` varchar(800) DEFAULT NULL,
  `current_longitude` decimal(20,6) DEFAULT NULL,
  `current_latitude` decimal(20,6) DEFAULT NULL,
  `current_time` varchar(400) DEFAULT NULL,
  `current_hour` int(11) DEFAULT NULL,
  `goal_time` varchar(400) DEFAULT NULL,
  `goal_hour` int(11) DEFAULT NULL,
  PRIMARY KEY (`gameId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

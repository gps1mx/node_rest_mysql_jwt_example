SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS `company`;
CREATE DATABASE `company`;
USE `company`;

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of employees
-- ----------------------------
BEGIN;
INSERT INTO `employees` VALUES (1, 'Ryan Ray', 20000.00);
INSERT INTO `employees` VALUES (2, 'Joe McMillan', 40000.00);
INSERT INTO `employees` VALUES (3, 'John Carter', 50000.00);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'mi_nombre', 'asdfasdf', 'Este es mi nombre');
COMMIT;

-- ----------------------------
-- Procedure structure for employeeAddOrEdit
-- ----------------------------
DROP PROCEDURE IF EXISTS `employeeAddOrEdit`;
delimiter ;;
CREATE PROCEDURE `employeeAddOrEdit`(IN _id int,
	IN _name varchar(255),
	IN _salary decimal(10,2))
BEGIN
	IF _id = 0 THEN
		INSERT INTO employees (name, salary)
		VALUES (_name, _salary);
		SET _id = LAST_INSERT_ID();
	ELSE
		UPDATE employees
		SET 
			name = _name,
			salary = _salary
			WHERE id = _id;
	END IF;
	SELECT _id AS id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

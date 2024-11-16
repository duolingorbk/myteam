-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema speakeasy
-- -----------------------------------------------------


-- -----------------------------------------------------
-- Schema speakeasy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `speakeasy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `speakeasy` ;

-- -----------------------------------------------------
-- Table `speakeasy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `progress` INT NULL DEFAULT NULL,
  `type` ENUM('user', 'admin') NULL DEFAULT 'user',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `speakeasy`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `language` ENUM('english', 'french') NOT NULL,
  `progress` INT NULL DEFAULT NULL,
  `UserId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `UserId` (`UserId` ASC) VISIBLE,
  CONSTRAINT `lessons_ibfk_1`
    FOREIGN KEY (`UserId`)
    REFERENCES `speakeasy`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `speakeasy`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `LessonId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `LessonId` (`LessonId` ASC) VISIBLE,
  CONSTRAINT `questions_ibfk_1`
    FOREIGN KEY (`LessonId`)
    REFERENCES `speakeasy`.`lessons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `speakeasy`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `status` TINYINT NULL DEFAULT NULL,
  `QuestionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `QuestionId` (`QuestionId` ASC) VISIBLE,
  CONSTRAINT `answers_ibfk_1`
    FOREIGN KEY (`QuestionId`)
    REFERENCES `speakeasy`.`questions` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;






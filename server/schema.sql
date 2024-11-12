-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema speakeasy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `speakeasy` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema speakeasy
-- -----------------------------------------------------
USE `speakeasy` ;

-- -----------------------------------------------------
-- Table `speakeasy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(45) NULL,
  `image` LONGTEXT NULL,
  `progress` INT NULL,
  `type` ENUM("user", "admin") NULL DEFAULT 'user',
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;

INSERT INTO `speakeasy`.`users` (name, email, password, image, progress, type)
VALUES
  ('John Doe', 'john.doe@example.com', NULL, NULL, NULL, 'user'),
  ('Jane Smith', 'jane.smith@example.com', NULL, NULL, NULL, 'user'),
  ('Alice Johnson', 'alice.johnson@example.com', NULL, NULL, NULL, 'user'),
  ('Bob Brown', 'bob.brown@example.com', NULL, NULL, NULL, 'user');


-- -----------------------------------------------------
-- Table `speakeasy`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`lessons` (
  `idlessons` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `language` ENUM("english", "french") NULL,
  `progress` INT NULL,
  `users_idusers` INT NOT NULL,
  PRIMARY KEY (`idlessons`),
  INDEX `fk_lessons_users_idx` (`users_idusers` ASC) VISIBLE,
  CONSTRAINT `fk_lessons_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `speakeasy`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `speakeasy`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`questions` (
  `idquestions` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NULL,
  `lessons_idlessons` INT NOT NULL,
  PRIMARY KEY (`idquestions`),
  INDEX `fk_questions_lessons1_idx` (`lessons_idlessons` ASC) VISIBLE,
  CONSTRAINT `fk_questions_lessons1`
    FOREIGN KEY (`lessons_idlessons`)
    REFERENCES `speakeasy`.`lessons` (`idlessons`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `speakeasy`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speakeasy`.`answers` (
  `idanswers` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NULL,
  `status` TINYINT NULL,
  `questions_idquestions` INT NOT NULL,
  PRIMARY KEY (`idanswers`),
  INDEX `fk_answers_questions1_idx` (`questions_idquestions` ASC) VISIBLE,
  CONSTRAINT `fk_answers_questions1`
    FOREIGN KEY (`questions_idquestions`)
    REFERENCES `speakeasy`.`questions` (`idquestions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;






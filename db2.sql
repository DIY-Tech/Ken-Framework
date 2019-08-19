-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`color` ;

CREATE TABLE IF NOT EXISTS `mydb`.`color` (
  `colorId` INT NOT NULL AUTO_INCREMENT,
  `colorName` VARCHAR(45) NOT NULL,
  `colorHex` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`colorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`material`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`material` ;

CREATE TABLE IF NOT EXISTS `mydb`.`material` (
  `materialId` INT NOT NULL AUTO_INCREMENT,
  `materialName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`materialId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(45) NULL,
  PRIMARY KEY (`categoryId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NOT NULL,
  `productPrice` VARCHAR(45) NOT NULL,
  `productDistPrice` VARCHAR(45) NOT NULL,
  `productType` VARCHAR(45) NOT NULL,
  `productDescription` VARCHAR(45) NOT NULL,
  `productImage` VARCHAR(45) NOT NULL,
  `material_materialId` INT NOT NULL,
  `category_categoryId` INT NOT NULL,
  PRIMARY KEY (`productId`),
  INDEX `fk_product_material_idx` (`material_materialId` ASC) VISIBLE,
  INDEX `fk_product_category1_idx` (`category_categoryId` ASC) VISIBLE,
  CONSTRAINT `fk_product_material`
    FOREIGN KEY (`material_materialId`)
    REFERENCES `mydb`.`material` (`materialId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_categoryId`)
    REFERENCES `mydb`.`category` (`categoryId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product_has_color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_has_color` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_has_color` (
  `product_productId` INT NOT NULL,
  `color_colorId` INT NOT NULL,
  PRIMARY KEY (`product_productId`, `color_colorId`),
  INDEX `fk_product_has_color_color1_idx` (`color_colorId` ASC) VISIBLE,
  INDEX `fk_product_has_color_product1_idx` (`product_productId` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_color_product1`
    FOREIGN KEY (`product_productId`)
    REFERENCES `mydb`.`product` (`productId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_has_color_color1`
    FOREIGN KEY (`color_colorId`)
    REFERENCES `mydb`.`color` (`colorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`account` ;

CREATE TABLE IF NOT EXISTS `mydb`.`account` (
  `accountId` INT NOT NULL AUTO_INCREMENT,
  `accountType` ENUM('admin', 'dist') NOT NULL DEFAULT 'dist',
  `accountCreated` DATETIME NOT NULL DEFAULT 'current timestamp',
  `accountEmail` VARCHAR(45) NOT NULL,
  `accountPassword` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`accountId`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

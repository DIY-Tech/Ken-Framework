-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema flatratemetal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flatratemetal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flatratemetal` DEFAULT CHARACTER SET utf8 ;
USE `flatratemetal` ;

-- -----------------------------------------------------
-- Table `flatratemetal`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`color` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`color` (
  `colorId` INT NOT NULL AUTO_INCREMENT,
  `colorName` VARCHAR(45) NOT NULL,
  `colorHex` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`colorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flatratemetal`.`material`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`material` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`material` (
  `materialId` INT NOT NULL AUTO_INCREMENT,
  `materialName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`materialId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flatratemetal`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`category` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(45) NULL,
  PRIMARY KEY (`categoryId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flatratemetal`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`product` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NOT NULL,
  `productRetailPrice` VARCHAR(45) NOT NULL,
  `productCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `productType` VARCHAR(45) NULL,
  `productDescription` VARCHAR(45) NULL,
  `productDimension` VARCHAR(45) NULL,
  `productBundleType` ENUM('bundle', 'box') NULL,
  `productBundleCount` VARCHAR(45) NULL,
  `productPalletCount` VARCHAR(45) NULL,
  `productGage` VARCHAR(45) NULL,
  `material_materialId` INT NOT NULL,
  `category_categoryId` INT NOT NULL,
  PRIMARY KEY (`productId`),
  INDEX `fk_product_material_idx` (`material_materialId` ASC),
  INDEX `fk_product_category1_idx` (`category_categoryId` ASC),
  CONSTRAINT `fk_product_material`
    FOREIGN KEY (`material_materialId`)
    REFERENCES `flatratemetal`.`material` (`materialId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_categoryId`)
    REFERENCES `flatratemetal`.`category` (`categoryId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flatratemetal`.`product_has_color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`product_has_color` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`product_has_color` (
  `product_has_colorId` INT NOT NULL AUTO_INCREMENT,
  `product_productId` INT NOT NULL,
  `color_colorId` INT NOT NULL,
  PRIMARY KEY (`product_has_colorId`, `product_productId`, `color_colorId`),
  INDEX `fk_product_has_color_color1_idx` (`color_colorId` ASC),
  INDEX `fk_product_has_color_product1_idx` (`product_productId` ASC),
  CONSTRAINT `fk_product_has_color_product1`
    FOREIGN KEY (`product_productId`)
    REFERENCES `flatratemetal`.`product` (`productId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_has_color_color1`
    FOREIGN KEY (`color_colorId`)
    REFERENCES `flatratemetal`.`color` (`colorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flatratemetal`.`account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`account` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`account` (
  `accountId` INT NOT NULL AUTO_INCREMENT,
  `accountType` ENUM('admin', 'dist') NOT NULL DEFAULT 'dist',
  `accountCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accountEmail` VARCHAR(45) NOT NULL,
  `accountPassword` VARCHAR(255) NOT NULL,
  `accountDiscount` VARCHAR(45) NULL,
  PRIMARY KEY (`accountId`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `flatratemetal`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `flatratemetal`.`image` ;

CREATE TABLE IF NOT EXISTS `flatratemetal`.`image` (
  `imagesId` INT NOT NULL AUTO_INCREMENT,
  `imagePath` VARCHAR(255) NOT NULL,
  `imageName` VARCHAR(45) NOT NULL,
  `imageSize` VARCHAR(45) NOT NULL,
  `imageCreated` DATETIME NOT NULL,
  `imageType` ENUM('jpg', 'png', 'svg') NOT NULL,
  `product_productId` INT NOT NULL,
  PRIMARY KEY (`imagesId`),
  INDEX `fk_image_product1_idx` (`product_productId` ASC),
  CONSTRAINT `fk_image_product1`
    FOREIGN KEY (`product_productId`)
    REFERENCES `flatratemetal`.`product` (`productId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

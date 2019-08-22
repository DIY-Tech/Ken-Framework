<?php

class ColorModel {
    public static function create($filtLoad) {
        return Dispatcher::dispatch(
            "INSERT INTO color 
            (colorName, colorHex)
            VALUES
            (:colorName, :colorHex)",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }

    public static function update($filtLoad) {
        $dynamicField = "";

        if(isset($filtLoad['colorName'])) {
            $dynamicField .= "colorName = :colorName";
        }

        if(isset($filtLoad['colorHex'])) {
            $dynamicField .= "colorHex = :colorHex";
        }

        // This piece of code is needed to remove any 
        // end of line comments that might be their
        // due to the nature of optional parameters
        $dynamicField = rtrim($dynamicField, ",");

        return Dispatcher::dispatch (
            "UPDATE color
            SET $dynamicField
            WHERE colorId = :colorId",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }

    public static function delete($filtLoad) {
        return Dispatcher::dispatch(
            "DELETE FROM color WHERE colorId = :colorId",
            $filtLoad
        );
    }

    public static function getAll($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM color",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }

    public static function getByProductId($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT col.colorName, col.colorHex
            FROM product as prod
            INNER JOIN product_has_color AS phc
            ON prod.productId == phc.product_productId
            INNER JOIN color as col
            ON phc.color_colorId = color.colorId
            WHERE prod.productId = :productId",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }

    public static function link($filtLoad) {
        return Dispatcher::dispatch(
            "INSERT INTO product_has_color 
            (color_colorId, product_productId)
            VALUES
            (:colorId, :productId)",
            $filtLoad
        );
    }
}
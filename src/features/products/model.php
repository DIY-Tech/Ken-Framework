<?php

class ProductModel {
    public static function create($filtLoad) {
        $dynamicField = "";
        $dynamicValue = "";

        if(isset($filterLoad['productType'])) {
            $dynamicField .= ", productType";
            $dynamicValue .= ", :productType";
        }

        if(isset($filterLoad['productDescription'])) {
            $dynamicField .= ", productDescription";
            $dynamicValue .= ", :productDescription";
        }

        if(isset($filterLoad['productDimension'])) {
            $dynamicField .= ", productDimension";
            $dynamicValue .= ", :productDimension";
        }

        if(isset($filterLoad['productBundleType'])) {
            $dynamicField .= ", productBundleType";
            $dynamicValue .= ", :productBundleType";
        }

        if(isset($filterLoad['productBundleCount'])) {
            $dynamicField .= ", productBundleCount";
            $dynamicValue .= ", :productBundleCount";
        }

        if(isset($filterLoad['productPalletCount'])) {
            $dynamicField .= ", productPalletCount";
            $dynamicValue .= ", :productPalletCount";
        }

        if(isset($filterLoad['productGage'])) {
            $dynamicField .= ", productGage";
            $dynamicValue .= ", :productGage";
        }

        return Dispatcher::dispatch (
            "INSERT INTO product
            (productName, productRetailPrice, material_materialId, category_categoryId $dynamicField)
            VALUES
            (:productName, :productRetailPrice, :materialId, :categoryId $dynamicValue)",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }

    public static function getAll($filtLoad) {
        return Dispatcher::dispatch (
            "SELECT * FROM product",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }
}
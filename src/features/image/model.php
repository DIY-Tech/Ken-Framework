<?php

class ImageModel {
    public static function upload($filtLoad) {
        return Dispatcher::dispatch(
            "INSERT INTO image
            (imagePath, imageName, imageSize, imageType, product_productId)
            VALUES
            (:imagePath, :imageName, :imageSize, :imageType, :productId)",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }
    public static function getByProductId($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM image WHERE product_productId = :productId",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }
    public static function delete($filtLoad) {
        return Dispatcher::dispatch(
            "DELETE FROM image WHERE imageId = :imageId",
            $filtLoad
        );
    }
}
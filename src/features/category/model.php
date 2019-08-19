<?php

class CategoryModel {
    public static function create($filtLoad) {
        return Dispatcher::dispatch(
            "INSERT INTO category
            (categoryName) VALUES (:categoryName)",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }

    public static function getOne($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM category WHERE categoryId = :categoryId",
            $filtLoad,
            ['fetchConstant' => 'fetch']
        );
    }

    public static function getAll($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM category",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }

    public static function delete($filtLoad) {
        return Dispatcher::dispatch(
            "DELETE FROM category WHERE categoryId = :categoryId",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }
}
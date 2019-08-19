<?php

class MaterialModel {
    public static function create($filtLoad) {
        return Dispatcher::dispatch(
            "INSERT INTO material
            (materialName) VALUES (:materialName)",
            $filtLoad,
            ['returnId' => TRUE]
        );
    }

    public static function getOne($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM material WHERE materialId = :materialId",
            $filtLoad,
            ['fetchConstant' => 'fetch']
        )
    }

    public static function getAll($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM material",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }
}
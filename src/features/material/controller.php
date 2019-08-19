<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/include.php';

$Material = new Controller('material');

$Material->addAction('create', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['materialName'], $filtLoad);
    $createMaterial = MaterialModel::create($filtLoad);
    if($createMaterial['rows'] == 1) {
        return Response::data($createMaterial, $filtLoad['materialName'] . " created successfully");
    }
}, TRUE);
$Material->addAction('update', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['materialId', 'materialName'], $filtLoad);
}, TRUE);

$Material->addAction('delete', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['materialId'], $filtLoad);
    $deleteMaterial = MaterialModel::delete($filtLoad);

    if($deleteMaterial['rows'] == 1) {
        return Resposne::success("Material deleted successfully");
    } else {
        return Response::err("Material did not delete successfully");
    }
}, TRUE);

$Material->addAction('getOne', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['materialId'], $filtLoad);
    return Response::data(MaterialModel::getOne($payload), "Material Retrieved");
}, TRUE);
$Material->addAction('getAll', function($payload) {
    return Response::data(MaterialModel::getAll($payload), "All materials Retrieved");
}, TRUE);
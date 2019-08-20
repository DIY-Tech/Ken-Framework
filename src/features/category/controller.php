<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/include.php';

$Category = new Controller('category');

$Category->addAction('create', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['categoryName'], $filtLoad);
    $createCategory = CategoryModel::create($filtLoad);
    if($createCategory['rows'] == 1) {
        return Response::data($createCategory, $filtLoad['categoryName'] . " created successfully");
    }
}, TRUE);
$Category->addAction('update', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['categoryId', 'categoryName'], $filtLoad);
}, TRUE);
$Category->addAction('delete', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['categoryId'], $filtLoad);
    $deleteCategory = CategoryModel::delete($filtLoad);

    if($deleteCategory['rows'] == 1) {
        return Resposne::success("Category deleted successfully");
    } else {
        return Response::err("Category did not delete successfully");
    }
}, TRUE);
$Category->addAction('getOne', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['categoryId'], $filtLoad);
    return Response::data(CategoryModel::getOne($payload), "Category Retrieved");
}, TRUE);
$Category->addAction('getAll', function($payload) {
    return Response::data(CategoryModel::getAll($payload), "All categorys Retrieved");
}, TRUE);
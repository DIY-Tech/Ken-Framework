<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/include.php';

$Product = new Controller('product');

$Product->addAction('create', function($payload){
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['accountType', 'productName', 'productRetailPrice', 'materialId', 'categoryId'], $filtLoad);

    if($filtLoad['accountType'] != 'admin') {
        return Response::err('You do not have privilages to add this resource');
    }

    $productCreated = ProductModel::create($filtLoad);
    if($productCreated['rows'] != 1) {
        return Response::err("Failed to create product");
    }

    return Response::data($productCreated, $filtLoad['productName'] . " was created successfully");

}, TRUE);

$Product->addAction('update', function($payload){}, TRUE);

$Product->addAction('delete', function($payload){}, TRUE);

$Product->addAction('getOne', function($payload){});

$Product->addAction('getAll', function($payload){
    return Response::data(ProductModel::getAll($payload), "All Products");
});
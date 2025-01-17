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

$Product->addAction('getOne', function($payload){
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['productId'], $filtLoad);
    $productData = ProductModel::getOne($filtLoad);
    $productData['images'] = ImageModel::getByProductId($filtLoad);
    return Response::data($productData, "Product retrieved");
});

$Product->addAction('getAll', function($payload){
    $products = ProductModel::getAll($payload);
    $alteredProducts = [];
    foreach($products As $prod) {
        $prod['images'] = ImageModel::getByProductId(['productId' => $prod['productId']]);
        $prod['colors'] = ColorModel::getByProductId(['productId' => $prod['productId']]);
        // echo(json_encode($prod));
        array_push($alteredProducts, $prod);
    }
    return Response::data($alteredProducts, "All Products");
});

$Product->addAction('getByCategory', function($payload) {
    return Response::data(CategoryModel::getAll($payload), "All categorys Retrieved");
}, TRUE);
$Product->addAction('getByMaterial', function($payload) {
    return Response::data(CategoryModel::getAll($payload), "All categorys Retrieved");
}, TRUE);
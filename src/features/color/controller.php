<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/include.php';

$Color = new Controller('color');

$Color->addAction('create', function($payload){
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['colorHex', 'colorName'], $filtLoad);
    $createColor = ColorModel::create($filtLoad);
    if($createColor['rows'] == 1) {
        return Response::data($createColor, "Color created successfully!");
    } else {
        return Response::err('Failed to create new color.');
    }
}, TRUE);

$Color->addAction('getAll', function($payload) {
    return Response::data(ColorModel::getAll($payload), 'Colors Retrieved Successfully');
});

$Color->addAction('getByProductId', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['productId'], $filtLoad);
    
    return Response::data(ColorModel::getByProductId($filtLoad), 'All colors of the selected product have been retrieved');
});

$Color->addAction('delete', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['colorId'], $filtLoad);
    if(ColorModel::delete($filtLoad) == 1) {
        return Response::success("Color was deleted successfully");
    }
}, TRUE);

$Color->addAction('link', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['colorId', 'productId'], $filtLoad);
    $linked = ColorModel::link($filtLoad);
    if($linked == 1) {
        return Response::success("Color linked to product");
    }

    return Response::err("Color did not link to product");
});
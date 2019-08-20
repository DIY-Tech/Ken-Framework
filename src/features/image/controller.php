<?php
require_once $_SERVER['DOCUMENT_ROOT'] .'/src/include.php';

$Image = new Controller('image');

$Image->addAction('upload', function($payload) {

    // size of file must be limited
    // file name should adhere to certain standards
    $productId = filter_input(INPUT_POST, 'productId', FILTER_SANITIZE_NUMBER_INT);
    $image_dir = "/serverAssets";
    $image_dir_path = $_SERVER['DOCUMENT_ROOT'] . $image_dir;
    $imageName = $_FILES['fileUpload']['name'];
    $imageSize = $_FILES['fileUpload']['size'];
    $imageFileType = getImageType($imageName);

    if(!$imageFileType) {
        return Response::err('Unsupported file type');
    }

    $source = $_FILES['fileUpload']['tmp_name'];
    $target = $image_dir_path . '/' . $imageName;
    $check = move_uploaded_file($source, $target);

    $payload = [
        "imagePath" => $image_dir . "/" . $imageName,
        "imageName" => $imageName,
        "productId" => $productId,
        "imageSize" => $imageSize,
        "imageType" => $imageFileType
    ]; 

    $imageUploaded = ImageModel::upload($payload);

    if($imageUploaded['rows'] == 1) {
        return Response::data($imageUploaded, $payload['imageName'] . " successfully uploaded");
    }

    return Response::err("Image was not uploaded successfully");

}, TRUE);

$Image->addAction('getByProductId', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['productId'], $filtLoad);

    return Response::data(ImageModel::getByProductId($filtLoad), "Successfully retrieved images");
});

$Image->addAction('delete', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(['imageId', 'imagePath'], $filtLoad);

    if(!unlink($_SERVER['DOCUMENT_ROOT'] . $cleanLoad['imagePath'])) {
        return Response::err("Error: could not delete the physical image file");
    }

    if(ImageModel::delete($filtLoad) == 1) {
        return Response::success("Image deleted successfully");
    }

    return Response::err("Error: could not delete image");
}, TRUE);
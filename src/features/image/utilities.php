<?php
function getAssetType($imgName) {
  $i = strrpos($imgName, '.');
  $ext = substr($imgName, $i);
  
  switch($ext) {
      case ".jpg":
      case ".JPG":
      case ".JPEG":
      case ".jpeg":
        return 'jpg';
      break;
      case ".png":
      case ".PNG":
        return "png";
      break;
      case ".svg":
        return "svg";
      default;
          return False;
      break;
  }
}
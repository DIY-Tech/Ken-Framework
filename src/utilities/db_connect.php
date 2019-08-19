<?php

// connects to the database
function dbConnect(){
  $server = "site1";
  $database = "flatratemetal";
  $user = "client";
  $password = "SvX83seKj6&@";
  $dsn = "mysql:host=$server; dbname=$database";
  $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
  try {
    $genericLink = new PDO($dsn, $user, $password, $options);
    return $genericLink;
  } catch (PDOException $ex) {
    echo $ex;
    exit;
  }
}
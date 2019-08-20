<?php

// globals
// This secret is a placeholder and needs to be removed in production
$secret = 'sec!ReT423*&';

// utilities

/**
 *  Configure this db_connect file to connect to the database you have
 *  created.
 */
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/db_connect.php';

/**
 * This db_connect_local is the file used locally for development
 * of php generic and can be deleted if downloading from github.
 */
// require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/db_connect_local.php'; 
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/response.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/ken.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/action.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/utilities/dispatcher.php';

// Account
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/account/utilities.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/account/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/account/model.php';

// Product
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/products/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/products/model.php';

// Material
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/material/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/material/model.php';

// Category
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/category/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/category/model.php';

// Image
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/category/controller.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/category/model.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/features/category/utilities.php';
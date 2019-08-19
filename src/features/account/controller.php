<?php 

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/include.php';
// Third party dependencies
use ReallySimpleJWT\Token;

$Account = new Controller('account');

$Account->addAction('create', function($payload) {

    global $secret;

    $filtLoad = Controller::filterPayload($payload);

    Controller::required (
        [
            'accountEmail',
            'accountPassword'
        ],
        $filtLoad
    );

    if(!isEmail($filtLoad['accountEmail'])) {
        return Response::err("Invalid Email");
    }

    $filtLoad['accountEmail'] = sanEmail($filtLoad['accountEmail']);

    // check to insure no account exists with that email already

    $filtLoad['accountPasswordHash'] = password_hash($filtLoad['accountPassword'], PASSWORD_DEFAULT);

    $accountCreated = AccountModel::create($filtLoad);

    if($accountCreated['rows'] != 1) { 
        return Response::err("Failed to create account."); 
    }

    return Response::data($accountCreated, $filtLoad['accountEmail'] . " account created successfully");

}, TRUE);

$Account->addAction('accountLogin', function($payload) {

    global $secret;

    $filtLoad = Controller::filterPayload($payload);
                 Controller::required (['accountEmail', 'accountPassword'], $filtLoad);

    $filtLoad['emailAddress'] = sanEmail($filtLoad["accountEmail"]);
    $accountData  = AccountModel::getAccountByEmail($filtLoad);

    if(empty($accountData)) {
      return Response::err("Account does not exist.");
    }

    // Hash the user supplied password and compare it to the password in the database
    // $filtLoad['accountPasswordHash'] = password_hash($filtLoad['accountPassword'], PASSWORD_DEFAULT);
    $hashCheck = password_verify(
      $filtLoad['accountPassword'], 
      $accountData['accountPassword']
    );

    if(!$hashCheck) { 
      return Response::err("Password Incorrect"); 
    }

    $accountLoginInfo = AccountModel::getAccountById($accountData);
    $expiration = time() + 3600 * 24 * 7;
    $issuer = 'flatratemetal';
    $accountLoginInfo["apiToken"] = Token::create(
      $accountLoginInfo['accountId'], 
      $secret, $expiration, 
      $issuer
    );

    return Response::data($accountLoginInfo, "Welcome back ". $accountLoginInfo['accountEmail'] . "!");
});

$Account->addAction('delete', function($payload) {
  $filtLoad = Controller::filterPayload($payload);
  Controller::required(['accountId'], $filtLoad);

  if(AccountModel::delete($filtLoad) == 1) {
    return Response::success("Account Deleted Successfully");
  } else {
    return Response::err("Error deleting account");
  }
}, TRUE);

$Account->addAction('getAll', function($payload) {
  $filtLoad = Controller::filterPayload($payload);
  Controller::required(['accountType'], $filtLoad);
  if($filtLoad['accountType'] !== 'admin') {
    return Response::err("The request wasn't made with an administrative account");
  } else {
    return Response::data(AccountModel::getAll($filtLoad), "All Accounts were retrieved");
  }
}, TRUE);

$Account->addAction('getOne', function($payload) {
  $filtLoad = Controller::filterPayload($payload);
  Controller::required(['accountType', 'accountId'], $filtLoad);
  if($filtLoad['accountType'] !== 'admin') {
    return Response::err("The request wasn't made with an administrative account");
  } else {
    return Response::data(AccountModel::getOne($filtLoad), "All Accounts were retrieved");
  }
}, True);

$Account->addAction('update', function($payload) {
  $filtLoad = Controller::filterPayload($payload);
  Controller::required(['accountId'], $filtLoad);
  if(AccountModel::update($filtLoad) == 1) {
    return Response::success("Account Updated Successfully");
  } else {
    return Response::err("error deleting account");
  }
}, TRUE);
<?php
require_once $_SERVER['DOCUMENT_ROOT'] .'/src/include.php';

$Email = new Controller('email');

$Email->addAction('send', function($payload) {
    $filtLoad = Controller::filterPayload($payload);
    Controller::required(
        [
            'emailSender', 
            'emailRecipient', 
            'emailSubject',
            'emailBody'
        ], $filtLoad);

    $headers = "From: " . $filtLoad['emailSender'];
    $headers .= "Content-type: text/html\r\n";
    mail($filtLoad['emailRecipient'], $filtLoad['emailSubject'], $filtLoad['emailBody'], $headers);
});
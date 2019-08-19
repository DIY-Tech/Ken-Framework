<?php

function sanEmail($email) {
  $sanEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
  $valEmail = filter_var($sanEmail, FILTER_VALIDATE_EMAIL);
  return $valEmail;
}
// Needs to compare a regular expression
function isEmail($input) {
  $key = stripos($input, '@');
  if ($key) {
    return true;
  } else {
    return false;
  }
}
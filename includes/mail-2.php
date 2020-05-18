<?php
$name = $_POST["name"];
$email = $_POST["email"];


$EmailTo = "matty@aledia.ca";
$Subject = "New Message Received";

// prepare email body text
$Fields.= "Name: ";
$Fields .= $name;
$Fields .= "\n";

$Fields.= "Email: ";
$Fields .= $email;
$Fields .= "\n";

// send email
$success = mail($EmailTo,  $Subject,  $Fields, "From:".$email);


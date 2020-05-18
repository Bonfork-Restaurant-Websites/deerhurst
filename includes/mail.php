<?php
$guests = $_POST["guests"];
$time = $_POST["Time"];
$date = $_POST["Date"];
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];


$EmailTo = "matty@aledia.ca";
$Subject = "New Message Received";

// prepare email body text
$Fields .= "Guests: ";
$Fields .= $guests;
$Fields .= "\n";

$Fields .= "Time: ";
$Fields .= $time;
$Fields .= "\n";

$Fields .= "Date: ";
$Fields .= $date;
$Fields .= "\n";

$Fields .= "Name: ";
$Fields .= $name;
$Fields .= "\n";

$Fields.= "Email: ";
$Fields .= $email;
$Fields .= "\n";

$Fields .= "Phone: ";
$Fields .= $phone;
$Fields .= "\n";


// send email
$success = mail($EmailTo,  $Subject,  $Fields, "From:".$email);


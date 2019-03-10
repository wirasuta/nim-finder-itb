<?php
$servername = 'localhost';
$dbname = 'wirasuta_nim';
$port = '3306';
$username = 'wirasuta_nimfinder';
$password = '26zNJKRw[YH$';

try {
    $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
?>
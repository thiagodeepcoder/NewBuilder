<?php

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = 'root';

$link = new MySQLi(DB_HOST, DB_USER, DB_PASS,);

$user = 'root';
$password = 'root';
$db = 'inventory';
$host = 'localhost';
$port = 8889;

$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);
?>
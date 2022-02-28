<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/passwordController.php");

    $token = $_GET['token'];

    $seekPasswordToken = new PasswordController();

    $resolve = $seekPasswordToken->seekPasswordToken($token);

    header('Content-Type: application/json');

    echo json_encode($resolve);
    // echo json_encode($data);
?>
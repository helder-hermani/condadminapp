<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/passwordController.php");

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $resetPassword = new PasswordController();

    $resolve = $resetPassword->resetPasswordInsertToken($data);

    header('Content-Type: application/json');

    echo json_encode($resolve);
    // echo json_encode($data);
?>
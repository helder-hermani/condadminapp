<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/passwordController.php");

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $changePassword = new PasswordController();

    $resolve = $changePassword->proceedChangePassoword($data);

    header('Content-Type: application/json');

    echo json_encode($resolve);
    // echo json_encode($data);
?>
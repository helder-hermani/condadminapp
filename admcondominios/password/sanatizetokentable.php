<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/passwordController.php");

    $userIndex = $_GET['userIndex'];
    $sanatizeTokenTable = new PasswordController();

    $resolve = $sanatizeTokenTable->sanatizeTokenTable($userIndex);

    header('Content-Type: application/json');

    echo json_encode($resolve);
?>
<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/userController.php");

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $insertUser = new UserController();

    $resolve = $insertUser->insertUser($data);

    header('Content-Type: application/json');

    echo json_encode($resolve);
    // echo json_encode($data);
?>
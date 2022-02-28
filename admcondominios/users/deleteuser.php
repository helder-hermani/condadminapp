<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/userController.php");

    $userindex = $_GET['userindex'];

    $deleteUser = new UserController();

    $resolve = $deleteUser->deleteUser($userindex);

    header('Content-Type: application/json');

    echo json_encode($resolve);
?>
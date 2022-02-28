<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include_once("../controllers/userController.php");
    
    $email = $_GET['email'];

    $userController = new UserController();
    $resolve = $userController->seekuser($email);
    

    header('Content-Type: application/json');

    echo json_encode($resolve);
?>
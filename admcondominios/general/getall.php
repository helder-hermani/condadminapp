<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

include_once("../controllers/generalController.php");


$table = $_GET['table'];

$generalController = new GeneralController();
$resolve = $generalController->getAllRecords($table);

header('Content-Type: application/json');

echo json_encode($resolve);
?>
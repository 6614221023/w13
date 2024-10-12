<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include '../DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
 
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if (isset($path[4]) && is_numeric($path[4])) {
            
            $sql = "SELECT * FROM confirmed_cases WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            
            $sql = "SELECT province_of_isolation AS province, COUNT(*) as confirmed_count 
        FROM confirmed_cases 
        GROUP BY province_of_isolation
        ORDER BY confirmed_count DESC 
        LIMIT 3";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        
        echo json_encode($users);
        break;
}

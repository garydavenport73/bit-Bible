<?php
header('Access-Control-Allow-Origin: *');
//echo $_POST["index"];
$osisRef = $_POST["osisRef"];
$commentary=file_get_contents("pulpit.json");
$commentaryObject=json_decode($commentary,true);
//echo $bible;
echo $commentaryObject[$osisRef];
?>
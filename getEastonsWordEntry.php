<?php
$index=$_POST["index"];
$file_contents = file_get_contents('eastons.json');
//echo $file_contents;
$eastonsObject=json_decode($file_contents,true);
echo json_encode($eastonsObject[$index]["entries"]);
?>
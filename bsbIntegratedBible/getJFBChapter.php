<?php
$key=$_POST["key"];
$file_contents = file_get_contents('jfb.json');
//echo $file_contents;
$jfbObject=json_decode($file_contents,true);
echo json_encode($jfbObject[$key]);
?>
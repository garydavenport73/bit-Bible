<?php
$key=$_POST["key"];
$commentaryBook=$_POST["commentary"];
$file_contents = file_get_contents($commentaryBook.'.json');
//echo $file_contents;
$jfbObject=json_decode($file_contents,true);
echo json_encode($jfbObject[$key]);
?>
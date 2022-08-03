<?php
header('Access-Control-Allow-Origin: *');
//echo $_POST["index"];
$osisRef = $_POST["osisRef"];
$bible=file_get_contents("NASBChapterBible.json");
$bibleObject=json_decode($bible,true);
//echo $bible;
echo $bibleObject[$osisRef];
?>
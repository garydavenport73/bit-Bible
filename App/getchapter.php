<?php
header('Access-Control-Allow-Origin: *');
//echo $_POST["index"];
$osisRef = $_POST["osisRef"];
$bibleFilename=$_POST["bible"]."ChapterBible.json";
$bible=file_get_contents($bibleFilename);
// $bible=file_get_contents("NASBChapterBible.json");
$bibleObject=json_decode($bible,true);
//echo $bible;
echo $bibleObject[$osisRef];
?>
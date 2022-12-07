<?php
$book=$_POST["book"];
$chapter=$_POST["chapter"];
$file_contents = file_get_contents('BSB.json');
//echo $file_contents;
$bibleObject=json_decode($file_contents,true);
echo json_encode($bibleObject[$book][$chapter]);
?>
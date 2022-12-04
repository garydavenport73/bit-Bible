<?php
$book=$_GET['book'];
$chapter=$_GET['chapter'];
$verse=$_GET['verse'];
$file_content = file_get_contents('bsb.json');
$bcv=json_decode($file_content);
echo $bcv->$chapter->$verse;
?>
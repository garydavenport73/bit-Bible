<?php
if (isset($_POST["bible"])){
    $bible=$_POST["bible"];  
}
else{
    $bible="BSB";
}
$book=$_POST["book"];
$chapter=$_POST["chapter"];
$file_contents = file_get_contents('./bibles/'.$bible.'.json');
//echo $file_contents;
$bibleObject=json_decode($file_contents,true);
echo json_encode($bibleObject[$book][$chapter]);
?>
<?php
header('Access-Control-Allow-Origin: *');
//echo $_POST["index"];
$index = $_POST["index"];
//include_once("finalDatabase.php");
 

// function file_get_contents_utf8($fn) {
//     $content = file_get_contents($fn);
//      return mb_convert_encoding($content, 'UTF-8',
//          mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
// }

$dictionaryString=file_get_contents("finalDatabase.json"); 

$dictionary=json_decode($dictionaryString,true);

//echo $dictArray[$index];
echo json_encode($dictionary[$index]);

?>
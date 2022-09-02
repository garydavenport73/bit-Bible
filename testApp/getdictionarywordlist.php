<?php
header('Access-Control-Allow-Origin: *');

$index = $_POST["index"];
$dictionaryString=file_get_contents("eastonsWithExtraStuff.json"); 
$dictionary=json_decode($dictionaryString,true);

$words=[];
//echo json_encode($dictionary[$index]);
foreach ($dictionary as $value) {
    $word=$value['word'];
    //echo "$word <br>";
    array_push($words,$word);
  }
  foreach ($words as $word) {
    
    //echo "$word <br>";

  }

  //echo count($words);
  echo json_encode($words);
?>
<?php
// $filename="bitBibleOffline.html";
// header('Access-Control-Allow-Origin: *');
// header("Content-disposition:attachment;filename=".$filename);
$bibleName=$_GET["bible-name"];
$readingPlan=$_GET["reading-plan"];

//page visit tracking
$user_ip=$_SERVER['REMOTE_ADDR'];
$date=date("Y/m/d");
file_put_contents("bitbibleOnlineVisits.csv",$user_ip.",".$date.",".$bibleName.",".$readingPlan."\n",FILE_APPEND|LOCK_EX);
chmod("bitbibleOnlineVisits.csv", 0640);

include_once("section1.php");
echo "<style>"; include_once("style.css"); echo "</style>";
include_once("section2.php");
echo "<br><script>let bibleName='" . $bibleName . "';</script>";
echo "<br><script>let readingPlanName='" . $readingPlan . "';</script>";
echo "<script>";include_once("bookChapterKeys.js");echo "</script>";
echo "<script>";include_once("osisReferencesArray.js");echo "</script>";
// if ($readingPlan==="Chronological"){
//     echo "<script>";include_once("Chronological.js");echo "</script>";
// }
// else if ($readingPlan==="test"){
//     echo "<script>";include_once("test.js");echo "</script>";
// }
echo "<script>";include_once($readingPlan.".js");echo "</script>";

//should make default here
echo "<script>";include_once("baseMap.js");echo "</script>";
echo "<script>";include_once("dictionaryStuff.js");echo "</script>";
echo "<script>";include_once("commentaryStuff.js");echo "</script>";
echo "<script>";include_once("appProcessing.js");echo "</script>";
echo "<script>";include_once("readingStuff.js");echo "</script>";
echo "<script>";include_once("stringParser.js");echo "</script>";
echo "<script>";include_once("eventListeners.js");echo "</script>";
echo "<script>";include_once("mapStuff.js");echo "</script>";
echo "<script>";include_once("nestedMenuStuff.js");echo "</script>";
// echo "<script>";include_once("NASBChapterBible.js");echo "</script>";
//echo "<script>let pulpit=";include_once("pulpit.json");echo ";</script>";
//echo "<script>let eastons=";include_once("eastonsModified.json");echo ";</script>";
// echo  "<script> let local = true; </script>";
echo "<script>";include_once("initialize.js");echo"</script>";
include_once("section3.php");

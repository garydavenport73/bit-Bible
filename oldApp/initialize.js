///////////// INITIALIZE /////////////////////
function askConfirm() {
    return "Close?";
}
function showVersion(local) {
    if (local === true) {
        document.getElementById("btn-download").style.display = "none";
        document.getElementById("version-type").innerHTML = "offline version";
    } else {
        document.getElementById("version-type").innerHTML = "online version";
    }
}

if (typeof local === 'undefined') {
    local = false;
}
console.log("local", local);

showVersion(local);
let showDates = true;
window.onbeforeunload = askConfirm;
window.onresize = checkAppsAfterResize;

let bibleBCSelection = document.getElementById("bible-bc-selection");
let bibleResult = document.getElementById("bible-result");
let mapContainer = document.getElementById("map-container");
let asciiMap = document.getElementById("ascii-map");
let dictionarySelection = document.getElementById("dictionary-selection");
let dictionaryResult = document.getElementById("dictionary-result");
let dictionaryDataList = document.getElementById("dictionary-words");
let dictionarySearchBox = document.getElementById(
    "dictionary-search-box"
);
let chapterSearchBox = document.getElementById("chapter-search-box");
let bibleChaptersDatalist = document.getElementById(
    "bible-chapters-datalist"
);
let commentarySearchBox = document.getElementById(
    "commentary-search-box"
);
let commentaryChaptersDatalist = document.getElementById(
    "commentary-chapters-datalist"
);
let commentaryResult = document.getElementById("commentary-result");
buildDictionarySearchOptions();
buildChapterSearchOptions();
buildCommentarySearchOptions();
//   theChapterBible = makeHTMLChapterBible(theChapterBible);
//   eastons = makeEastons(eastons);
document.getElementById("reading-plan-table").innerHTML =
    makeReadingTable(readingPlan);

displayReadingPlanName();
displayBibleName();
document.getElementsByTagName("title")[0].innerHTML = readingPlanName + " " + bibleName + " bitBible";
document.getElementById('android-download-address').href = "bitbibleOffline.php?reading-plan=" + readingPlanName + "&bible-name=" + bibleName;
document.getElementById('android-download-address').href = "bitbibleOffline.php?reading-plan=" + readingPlanName + "&bible-name=" + bibleName;
document.getElementById('iphone-download-address').href = "bitbibleOfflineIPhone.php?reading-plan=" + readingPlanName + "&bible-name=" + bibleName;
//   toggleReadingDates();
addEventListenersToNestedMenus();

setSizeOfPre();

initializeNavButtonsAndCloseApps();
addEventListenersToMapButtons();
addEventListenersToOpenVerses();
addEventListenersToOpenChapters();
addEventListenersToOpenDictionaryEntries();
addEventListenersToFoundBibleWords();
addEventListenersToDictionaryLocations();
addEventListenersToNavigateChapters();
addEventListenersToNavigateCommentaries();

//closeAllApps();
selectBibleVerse("Gen.1.1");
document.getElementById("app-bible").style.display = "block";
document.getElementById("btn-bible").style.backgroundColor =
    "rgb(0,124,207)";
document.getElementById("ascii-map").innerText = baseMap;

let audioButton = document.getElementById("audio");
let playingAudio = false;
audioButton.addEventListener("click", playOrAbortSpeech);
if ('speechSynthesis' in window){
    var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
}


function playOrAbortSpeech() {
    if ('speechSynthesis' in window){
        msg.text = document.getElementById("bible-result").innerText;

        for (let i = 177; i >= 0; i--) { //longest chapter in Bible is 176 verses
            //psalm 119
            msg.text = msg.text.split("\n" + i.toString()).join("\n");
            msg.text = msg.text.split("." + i.toString()).join(".");
            msg.text = msg.text.split("," + i.toString()).join(",");
            msg.text = msg.text.split(":" + i.toString()).join(":");
            msg.text = msg.text.split("\"" + i.toString()).join("\"");
            msg.text = msg.text.split("?" + i.toString()).join("?");
            msg.text = msg.text.split("'" + i.toString()).join("'");  
        }
        console.log("speech button pressed");
    
        if (playingAudio === false) {
            console.log("attempting to play");
            //currently not playing, user wants play
            window.speechSynthesis.speak(msg);
        }
        else {
            console.log("attempting to abort");
            //currently playing, stop audio
            window.speechSynthesis.cancel(msg)
        }
        playingAudio = !playingAudio;
    }
    else{
        alert("Speech synthesis is not available in this browser.");
    }
 
}
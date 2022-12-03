"use strict";
//////////////////////////////////////////////////////////////
//
//  MAKE READING PLAN TABLE AND NECESSARY FUNCTIONS
//
//////////////////////////////////////////////////////////////
function makeReadingTable(readingPlan) {
    //console.log(readingPlan);
    let readingTable = "<tr>";
    let now = new Date();
    let currentYear = now.getFullYear();
    for (let day in readingPlan) {
        let intDay = parseInt(day.split("Day").join("").trim());
        //console.log(intDay);
        //console.log(day, readingPlan[day]);
        let dayArray = readingPlan[day].split(",");
        readingTable +=
            "<td><ul><input type='checkbox' id='reading-check-" +
            intDay.toString() +
            "'><label><b>" +
            intDay.toString() +
            "</b></label></li>";
        readingTable +=
            "<li class='day-of-year' style='display:none'>" +
            getDateString(currentYear, intDay) +
            "</li>";

        for (let readingChapter of dayArray) {
            readingTable +=
                //used to be open-chapter, but allows for either
                "<li class='osis color-hover'>" +
                readingChapter +
                "</li>";
        }
        readingTable += "</ul></td>";
        if (intDay % 7 === 0) {
            //console.log("break week here");
            readingTable += "</tr><tr>";
        }
        // if (intDay % 28 === 0) {
        //     //console.log("break month here");
        //     readingTable +=
        //         "<td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr><tr>";
        // }
    }
    readingTable += "</tr>";
    return readingTable;
}

function displayReadingPlanName() {
    document.getElementById("reading-plan-name").innerHTML = readingPlanName;
}

function displayBibleName() {
    document.getElementById("bible-name").innerHTML = bibleName + "<span id='audio'>&#128266;</span>";
}

function getTodaysDate() {
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + month + "-" + day;
    return today;
}

function getDateString(year, dayInteger) {
    const d = new Date(year, 0, dayInteger);
    return (
        d.getFullYear().toString() +
        "-" +
        ("0" + (d.getMonth() + 1).toString()).slice(-2) +
        "-" +
        ("0" + d.getDate().toString()).slice(-2)
    );
}

function toggleReadingDates() {
    let readingDates = document.getElementsByClassName("day-of-year");
    //console.log(readingDates);
    let today = getTodaysDate();

    for (let i = 0; i < readingDates.length; i++) {
        if (readingDates[i].style.display === "none") {
            readingDates[i].style.display = "list-item";
            if (readingDates[i].innerText === today) {
                //console.log("today found! at", today);
                readingDates[i].style.backgroundColor = "orange";
            }
            else { //if app open spans more than one day turns off orange
                readingDates[i].style.backgroundColor = "unset";
            }
            showDates = true;
        } else {
            readingDates[i].style.display = "none";
            showDates = false;
        }
    }
}

function showReadingDates() {
    let today = getTodaysDate();
    let readingDates = document.getElementsByClassName("day-of-year");
    for (let i = 0; i < readingDates.length; i++) {
        readingDates[i].style.display = "list-item";
        if (readingDates[i].innerText === today) {
            //console.log("today found! at", today);
            readingDates[i].style.backgroundColor = "orange";
        }
    }
    showDates = true;
}
function hideReadingDates() {
    let readingDates = document.getElementsByClassName("day-of-year");
    for (let i = 0; i < readingDates.length; i++) {
        readingDates[i].style.display = "none";
    }
    showDates = false;
}

/////////////////// RELATED TO LOADING SAVING READING SCHEDULE /////////////////////

function saveReadingProgress() {
    let saveData = {};
    for (let i = 1; i < 366; i++) {
        let checkBoxId = "reading-check-" + i.toString();
        if ((document.getElementById(checkBoxId) != null)) {
            let checkBox = document.getElementById(checkBoxId);
            //console.log(checkBoxId, checkBox.checked);
            saveData[checkBoxId] = checkBox.checked;
        }
    }
    saveData["show-dates"] = showDates;
    saveData["reading-plan-name"] = document.getElementById("reading-plan-name").innerText;

    saveData["font-family"] = document.getElementsByTagName('html')[0].style.fontFamily;
    saveData["border-radius"] = document.getElementsByTagName('h1')[0].style.borderRadius;
    saveData["font-size"]=document.getElementsByTagName('*')[0].style.fontSize;


    //console.log(JSON.stringify(saveData));
    saveStringToTextFile(JSON.stringify(saveData));
}
function saveStringToTextFile(
    str1,
    basename = "readingPlanProgress",
    fileType = ".json"
) {
    let filename = basename + fileType;
    let blobVersionOfText = new Blob([str1], {
        type: "text/plain",
    });
    let urlToBlob = window.URL.createObjectURL(blobVersionOfText);
    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.download = filename;
    downloadLink.href = urlToBlob;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.parentElement.removeChild(downloadLink);
}

function loadReadingProgress() {

    let fileContents = "";
    let inputTypeIsFile = document.createElement("input");
    inputTypeIsFile.type = "file";
    inputTypeIsFile.addEventListener("change", function () {
        let fileInput = inputTypeIsFile.files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            let readingPlanData = JSON.parse(fileLoadedEvent.target.result);
            console.log(readingPlanData);


            if (readingPlanData["reading-plan-name"] === "Old Testament/New Testament") {
                loadReadingTable("Old Testament/New Testament", OTNTReadingPlan);
            }
            else if (readingPlanData["reading-plan-name"] === "Straight Through") {
                loadReadingTable("Straight Through", StraightReadingPlan);
            }
            else {
                loadReadingTable("Chronological", ChronologicalReadingPlan);
            }

            //console.log(readingPlanData);
            for (let readingDay in readingPlanData) {
                let checkBoxId = readingDay;
                if (document.getElementById(checkBoxId) != undefined) {
                    document.getElementById(checkBoxId).checked =
                        readingPlanData[readingDay];
                }
            }
            if (readingPlanData["show-dates"] != undefined) {
                console.log(
                    "not undefined, show-dates is " +
                    readingPlanData["show-dates"] +
                    "in json loaded in"
                );

                showDates = readingPlanData["show-dates"];

                if (showDates === true) {
                    showReadingDates();
                } else {
                    console.log("calling hideReadingDates");
                    hideReadingDates();
                }
            }
            //change styles also
            let buttons = document.getElementsByTagName('button');
            let h1s = document.getElementsByTagName('h1');
            let h2s = document.getElementsByTagName('h2');
            let h3s = document.getElementsByTagName('h3');
            if (readingPlanData["font-family"] != undefined) {
                document.getElementsByTagName('html')[0].style.fontFamily = readingPlanData["font-family"];
            }

            for (let button of buttons) {
                if (readingPlanData["font-family"] != undefined) {
                    button.style.fontFamily = readingPlanData["font-family"];
                }
                if (readingPlanData["border-radius"] != undefined) {
                    button.style.borderRadius = readingPlanData["border-radius"];
                }
            }
            for (let h1 of h1s) {
                if (readingPlanData["font-family"] != undefined) {
                    h1.style.borderRadius = readingPlanData["border-radius"];
                }
            }

            if (readingPlanData["font-size"]!=undefined){
                document.getElementsByTagName('*')[0].style.fontSize=readingPlanData["font-size"];
            }

        };
        fileReader.readAsText(fileInput, "UTF-8");
    });
    inputTypeIsFile.click();
}

function loadReadingTable(title, readingPlanObject) {
    readingPlanTable.innerHTML = makeReadingTable(readingPlanObject);
    document.getElementById("reading-plan-name").innerHTML = title;
    showDates = false;
    addEventListenersToReferences();
}

function switchReadingPlans() {
    // if (true){
    if (confirm("Are you sure?\nPlease save any reading plan data before switchinig.")) {
        console.log("run switching mechanism");
        console.log(document.getElementById("reading-plan-name").innerHTML);
        if (document.getElementById("reading-plan-name").innerHTML === "Old Testament/New Testament") {
            loadReadingTable("Straight Through", StraightReadingPlan);
        }
        else if (document.getElementById("reading-plan-name").innerHTML === "Chronological") {
            loadReadingTable("Old Testament/New Testament", OTNTReadingPlan);
        }
        else {
            loadReadingTable("Chronological", ChronologicalReadingPlan);
        }
    }
}
      //////////////////////////////////////////////////////////////
      //
      //                SECTION ENDS
      //
      //////////////////////////////////////////////////////////////
      
      "use strict";
      ///////////////////////////////////////////////////////////
      /////////////AUDIO///////////////////////////////////////
      ////////////////////////////////////////////////////////
let playingAudio = false;
let playButton = document.getElementById("play-audio");
playButton.addEventListener("click", play);
let pauseButton = document.getElementById("pause-audio");
pauseButton.addEventListener("click", pause);
let stopButton = document.getElementById("stop-audio");
stopButton.addEventListener("click", stop);

const synth = window.speechSynthesis;
let myPauseProperty = false;
let utterThis;
function stop() {
    warnNoSynth();
    myPauseProperty = false;
    synth.cancel(utterThis);
}
function play() {
    warnNoSynth();
    if ((myPauseProperty === true)&&(synth.speaking===true)) {//alredy started not ended
        //speech somewhere in the middle, and paused, needs resumed
        synth.resume();
        myPauseProperty=false;
    }
    else if (synth.speaking===false) {
        let myText = document.getElementById("bible-contents").innerText;
        myText = myText.replace(/\d\d?\d?\./g, " "); //remove verse numbers
        //not started or has ended, expects to start play
        utterThis = new SpeechSynthesisUtterance(myText);
        synth.speak(utterThis);
        myPauseProperty=false;
    }
}
function pause() {
    warnNoSynth();
    if ((myPauseProperty === true)&&(synth.speaking===true)) {
        //speech somewhere in middle of phrase and paused, user wants unpause
        synth.resume();
        myPauseProperty = false;
    }
    else if ((myPauseProperty === false)&&(synth.speaking===true)) {
        //speech somewhere in middle of phrase and unpaused, user wants pause
        synth.pause()
        myPauseProperty=true;
    }
}
function warnNoSynth(){
    if (!('speechSynthesis' in window)) {
        alert("Speech synthesis is not available in this browser.");
    }
}
////////////////////////////////////////////////
///////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////
////MAP STUFF /////////////////////////////
////////////////////////////////////////////////

"use strict";
//computes the size of the map, and keeps reducing the size until under the specified width
   function setSizeOfAsciiMap(pixelWidth) {
    //pixelWidth = 100; //target width
    asciiMap.style.fontSize = "20px";
    let floatFontSize = 20;

    let myWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    console.log(myWidth);
    // if (myWidth > 960) {
    //     pixelWidth = 480; //matches breakpoints for tablet
    // }

    console.log(asciiMap.offsetWidth); //the width of ascii map
    while (asciiMap.offsetWidth >= pixelWidth) {
        //map to big, above target
        floatFontSize = parseFloat(asciiMap.style.fontSize.slice(0, -2));
        console.log(asciiMap.offsetWidth, floatFontSize);
        floatFontSize = floatFontSize - 0.5;
        asciiMap.style.fontSize = floatFontSize + "px"; //reduce map font size
        if (floatFontSize <= 0.5) {
            //minimum font size;
            break;
        }
    }
}
function getYFromLatitude(latitude) {
    //y=mx+b;
    //yLocation=mLat*latitude+bLat
    //latitude starts at 34 and goes to 29

    let topLatitude = 34.0;
    let bottomLatitude = 29.0;
    //let bottomPixel = 745;
    let bottomPixel = asciiMap.offsetHeight;
    console.log("height " + bottomPixel);
    let topPixel = 0;

    let mLat = (bottomPixel - topPixel) / (bottomLatitude - topLatitude);
    let bLat = bottomPixel - mLat * bottomLatitude;
    let yLocation = mLat * latitude + bLat;
    return yLocation;
}

function getXLocationFromLongitude(longitude) {
    //y=mx+b;
    //xLocation=mLong*longitude+bLong
    //longitude starts at 33.5 and ends at 36.5

    let leftLongitude = 33.5;
    let rightLongitude = 36.5;
    let leftPixel = 0;
    //let rightPixel = 800;
    let rightPixel = asciiMap.offsetWidth;
    console.log("width " + rightPixel);

    let mLong = (rightPixel - leftPixel) / (rightLongitude - leftLongitude);
    let bLong = rightPixel - mLong * rightLongitude;
    return mLong * longitude + bLong;
}

function plotDataPoint(str, latitude, longitude, className = "bullseye") {
    let xLocation = getXLocationFromLongitude(longitude);
    let yLocation = getYFromLatitude(latitude);
    if ((xLocation < 0) || (xLocation > asciiMap.offsetWidth) || (yLocation < 0) || (yLocation > asciiMap.offsetHeight)) {
        //plot nothing, it is off map
    }
    else {
        let mapContainer = document.getElementById("map-container");
        let bullseye = document.createElement("span");
        bullseye.innerText = str;
        bullseye.style.position = "absolute";
        bullseye.classList.add(className);
        bullseye.style.left = xLocation + "px";
        bullseye.style.top = yLocation + "px";
        mapContainer.appendChild(bullseye);
    }
}


function clearBullsEyes() {
    let bullsEyes = document.getElementsByClassName("bullseye");
    for (let i = bullsEyes.length - 1; i >= 0; i--) {
        bullsEyes[i].remove();
    }
    document.getElementById("map-info").innerHTML = "&nbsp;";
    //document.getElementById("off-map-list").innerHTML="";
}
function clearBackgroundLocations() {
    let backgroundLocations = document.getElementsByClassName("background-location");
    for (let i = backgroundLocations.length - 1; i >= 0; i--) {
        backgroundLocations[i].remove();
    }
    document.getElementById("map-name").innerHTML = "&nbsp;";
    //document.getElementById("off-map-list").innerHTML="";
}


let buttonSelectMaps = document.getElementsByClassName("btn-select-map");
console.log(buttonSelectMaps);
for (let button of buttonSelectMaps) {
    button.addEventListener("click", addBackgroundLocations);
}
function addBackgroundLocations(evt) {
    clearBackgroundLocations();
    let mapName = evt.target.id.split("map-")[1];
    console.log(mapName);
    document.getElementById("map-name").innerHTML = mapName;


    if (evt.target.id === "map-Abraham") {
        plotDataPoint("o Canaan", "31.6935295036883", "34.8438828857684", "background-location");
        plotDataPoint("o Ur", "30.9625", "46.103056", "background-location");
        plotDataPoint("o Haran", "36.86", "39.03139", "background-location");
        plotDataPoint("o Damascus", "33.511612", "36.309102", "background-location");
        plotDataPoint("o Shechem", "32.22111", "35.25444", "background-location");
        plotDataPoint("o Bethel", "31.93053921", "35.22103275", "background-location");
        plotDataPoint("o Dan", "33.24856", "35.65252", "background-location");
        // plotDataPoint("o Hobah","33.5","36.466667","background-location");
        plotDataPoint("o Salem", "31.777444", "35.234935", "background-location");
        plotDataPoint("o Gerar", "31.38176", "34.60698", "background-location");
        plotDataPoint("o Beersheba", "31.245", "34.84068", "background-location");
        plotDataPoint("o Egypt", "31.032047", "33.854957", "background-location");
    } else if (evt.target.id === "map-Moses") {
        plotDataPoint("o Sinai", "29.5", "34", "background-location");
        plotDataPoint("o Zin", "31.6935295036883", "34.8438828857684", "background-location");
        plotDataPoint("o Elim", "29.306194", "32.980924", "background-location");
        plotDataPoint("o Beer", "30.998062", "35.498547", "background-location");
        plotDataPoint("o Marah", "29.35", "32.933333", "background-location");
        plotDataPoint("o Red Sea", "19", "39.5", "background-location");
        plotDataPoint("o Wilderness of Sin", "28.838778", "33.420573", "background-location");
    } else if (evt.target.id === "map-12 Tribes") {
        plotDataPoint("o Kedesh", "32.559061", "35.246206", "background-location");
        plotDataPoint("o Golan", "32.80007553", "35.9373013", "background-location");
        plotDataPoint("o Ramoth", "32.049953", "35.733402", "background-location");
        plotDataPoint("o Bezer", "32.51613741", "36.48829076", "background-location");
        plotDataPoint("o Hebron", "31.524354", "35.108539", "background-location");
        plotDataPoint("o Shechem", "32.22111", "35.25444", "background-location");
        plotDataPoint("o Damascus", "33.511612", "36.309102", "background-location");
        plotDataPoint("o Ammon", "31.95522", "35.94503", "background-location");
        plotDataPoint("o Jerusalem", "31.777444", "35.234935", "background-location");
        plotDataPoint("o Samaria", "32.280231", "35.197929", "background-location");
    } else if (evt.target.id === "map-Divided Kingdoms") {
        plotDataPoint("o Shechem", "32.22111", "35.25444", "background-location");
        plotDataPoint("o Samaria", "32.280231", "35.197929", "background-location");
        plotDataPoint("o Jerusalem", "31.777444", "35.234935", "background-location");
        plotDataPoint("o Hebron", "31.524354", "35.108539", "background-location");
        plotDataPoint("o Gaza", "31.503959", "34.46203", "background-location");
        plotDataPoint("o Gerar", "31.38176", "34.60698", "background-location");
        plotDataPoint("o Damascus", "33.511612", "36.309102", "background-location");
        plotDataPoint("o Jezreel", "32.502074", "35.50196", "background-location");
    } else if (evt.target.id === "map-Jesus") {
        plotDataPoint("o Bethlehem", "31.70431", "35.20746", "background-location");
        plotDataPoint("o Damascus", "33.511612", "36.309102", "background-location");
        plotDataPoint("o Phillipi", "41.01316", "24.28409", "background-location");
        plotDataPoint("o Nazareth", "32.701029", "35.300148", "background-location");
        plotDataPoint("o Jezreel", "32.502074", "35.50196", "background-location");
        plotDataPoint("o Samaria", "32.280231", "35.197929", "background-location");
        plotDataPoint("o Sea Galilee", "32.8138046", "35.590564", "background-location");
        plotDataPoint("o Dead Sea", "31.577850349495", "35.52394311", "background-location");
        plotDataPoint("o Mt. Ebal", "31.79819", "35.80986", "background-location");
        plotDataPoint("o Jerusalem", "31.777444", "35.234935", "background-location");
        plotDataPoint("o Hebron", "31.524354", "35.108539", "background-location");
        plotDataPoint("o Carmel", "31.422876", "35.132952", "background-location");
        plotDataPoint("o Gaza", "31.503959", "34.46203", "background-location");
        plotDataPoint("o Bethel", "31.93053921", "35.22103275", "background-location");
    }
}

function openGoogleMap() {
    let location = document.getElementById("map-info").innerText.split(": ")[1];
    console.log(location);
    if ((location !== undefined) && (location.indexOf("undefined") === -1)) {
        let url = "http://maps.google.com/maps?q=" + location;
        console.log("opening: " + url);
        window.open(url);
    }
}

function locationOffMap(latitude, longitude) {
    let xLocation = getXLocationFromLongitude(longitude);
    let yLocation = getYFromLatitude(latitude);
    if ((xLocation < 0) || (xLocation > asciiMap.offsetWidth) || (yLocation < 0) || (yLocation > asciiMap.offsetHeight)) {
        return true;
    } else {
        return false;
    }
}

function clearAllLocations(){
    clearBullsEyes();
    clearBackgroundLocations();
}
///////////////////////////////////////////////////
"use strict";
/////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////
//Name important global elements
let readingPlanTable = document.getElementById("reading-plan-table");
let bibleSelect = document.getElementById("bible-select");
let bibleContents = document.getElementById("bible-contents");
let commentarySelect = document.getElementById("commentary-select");
let commentaryContents = document.getElementById("commentary-contents");
let dictionaryInput = document.getElementById("dictionary-input");
let dictionaryContents = document.getElementById("dictionary-contents");
let seeCommentaryButton = document.getElementById("see-commentary-button");
let dictionaryWordLoadButton = document.getElementById("dictionary-word-load");
let asciiMap = document.getElementById("ascii-map");
let readingButton = document.getElementById("reading-button");
let bibleButton = document.getElementById("bible-button");
let dictionaryButton = document.getElementById("dictionary-button");
let commentaryButton = document.getElementById("commentary-button");
let mapButton = document.getElementById("map-button");
let helpButton = document.getElementById("help-button");
let showDates = false;

//load map set size of map
asciiMap.innerHTML = BASEMAP;
setSizeOfAsciiMap(320);//sets to 320px

//Add event listeners to the Bible Selectn process
bibleSelect.addEventListener("input", showBibleChapter);
seeCommentaryButton.addEventListener("click", processSeeCommentaryBtn);
dictionaryWordLoadButton.addEventListener("click", showDictionaryEntry);
commentarySelect.addEventListener("input", showCommentaryChapter);
document.getElementById("reading-button").addEventListener("click", () => { showMain("reading"); });
document.getElementById("bible-button").addEventListener("click", () => { showMain("bible"); });
document.getElementById("dictionary-button").addEventListener("click", () => { showMain("dictionary"); });
document.getElementById("commentary-button").addEventListener("click", () => { showMain("commentary"); });
document.getElementById("map-button").addEventListener("click", () => { showMain("map"); setSizeOfAsciiMap(320); });
document.getElementById("help-button").addEventListener("click", () => { showMain("help"); });
document.getElementById("courier-button").addEventListener("click", (evt) => { changeFont(evt.target); });
document.getElementById("sans-button").addEventListener("click", (evt) => { changeFont(evt.target); });
document.getElementById("times-button").addEventListener("click", (evt) => { changeFont(evt.target); });
document.getElementById("decrease-font").addEventListener("click", (evt) => { changeFont(evt.target); });
document.getElementById("increase-font").addEventListener("click", (evt) => { changeFont(evt.target); });
document.getElementById("show-all-checkbox").addEventListener("change", processShowAllCheckBox);
document.getElementById("load-reading-progress").addEventListener("click", loadReadingProgress);
document.getElementById("save-reading-progress").addEventListener("click", saveReadingProgress);
document.getElementById("toggle-reading-dates").addEventListener("click", toggleReadingDates);
document.getElementById("switch-reading-plans").addEventListener("click", switchReadingPlans);
document.getElementById("btn-clear-all-locations").addEventListener("click", clearAllLocations);
document.getElementById("btn-open-google-map").addEventListener("click", openGoogleMap);

window.onbeforeunload = askConfirm;

//Generate the keys to the JFB Commentary
//-----------------------------------------------
let jfbKeys = [];
for (let i = 0; i < OSISBOOKS.length; i++) {
    let book = OSISBOOKS[i];
    for (let j = 0; j < 200; j++) {
        let key = book + "." + j.toString();
        if (jfb.hasOwnProperty(key)) {
            jfbKeys.push(key);
        }
    }
}
//Build the commentary select options from the keys.
let str = "";
for (let i = 0; i < jfbKeys.length; i++) {
    //console.log(jfbKeys[i]);
    let bookChapter = jfbKeys[i].split(".")[0] + " " + jfbKeys[i].split(".")[1];
    str += "<option value='" + jfbKeys[i] + "'>" + bookChapter + "</option>";
}
commentarySelect.innerHTML = str;
//-----------------------------------------------

//Generate the osis keys from the nested Bible
//-----------------------------------------------
let osis = [];
for (let i = 0; i < OSISBOOKS.length; i++) {
    let book = OSISBOOKS[i];
    for (let j = 0; j < 200; j++) {
        if (nestedBible[book].hasOwnProperty(j.toString())) {
            osis.push(book + "." + j.toString());
        }
    }
}
//Build the Bible select options
str = "";
for (let i = 0; i < osis.length; i++) {
    //console.log(osis[i]);
    let bookChapter = osis[i].split(".")[0] + " " + osis[i].split(".")[1];
    str += "<option value='" + osis[i] + "'>" + bookChapter + "</option>";
}
bibleSelect.innerHTML = str;
//-----------------------------------------------

//Generate the dictionary words from the Eastons Dictionary
//----------------------------------------------
let dictionaryWords = [];
for (let i = 0; i < eastons.length; i++) {
    dictionaryWords.push(eastons[i]["word"]);
}
//Build the search input for the dictionary
str = "";
for (let i = 0; i < dictionaryWords.length; i++) {
    str += "<option value='" + dictionaryWords[i] + "'>";
}
document.getElementById("bible-words").innerHTML = str;
//----------------------------------------------

//load initial settings
bibleSelect.value = "Gen.1";
showBibleChapter();
dictionaryInput.value = "Jerusalem";
dictionaryWordLoadButton.click();
commentarySelect.value = "Gen.1";
showCommentaryChapter();
showMain('bible');
loadReadingTable("Chronological", ChronologicalReadingPlan);
makeFavicon("B", "white", "blue");

///////////////////////////////////////////
//  General functions
/////////////////////////////////////////////////
function askConfirm() {
    return "Close?";
}

function makeFavicon(letter, color, backgroundColor) {
    //put this in head of html document
    //<link id="favicon-link" rel="icon" type="image/x-icon" href="">
    let canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 16, 16);

    let ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = color;
    ctx2.font = "bold 12px Arial";
    ctx2.fillText(letter, 4, 12);

    let link = document.getElementById("favicon-link");
    link.href = canvas.toDataURL("image/x-icon");
}
function convertPlainText(txt, obj) {
    //https://www.experts-exchange.com/questions/20954757/Convert-Plain-Text-to-HTML.html
    //dirklance
    //this line replaces all double line breaks with a "<p></p>"
    //it also adds a <p> to the beginning and the </p> to the end
    //   \r\n stands for a line break, and \s stands for any empty space
    txt = "<p>" + txt.split(/\r\n(\s+)?\r\n/).join("</p><p>") + "</p>";
    //this line replaces all line breaks with a <br>
    txt = txt.split("\n").join("<br>");
    //this line replaces the links
    //txt=txt.replace(/((http:\/\/)|(www))\.[^\s]+/gi,function(p1){return "<a href=\""+p1+"\">"+p1+"</a>";});
    //this line replaces all remaining line breaks with an empty space
    txt = txt.replace(/(\r|\n|\r\n)/gi, "");
    //this line adds a line breaks between each paragraph
    txt = txt.split("</p><p>").join("</p>\r\n<p>");
    //this just outputs the new text
    //obj.value=txt;
    return txt;
}

/// General functions related to navigation and preferences
/////////////////////////////////////////////////////
//These are active menus that expand or contract when clicked.
//They are present in the dictionary entries and can open and close their siblings
function addEventListenersToNestedMenues() {
    let nestedMenues = document.getElementsByClassName("nested-menu");
    for (let nestedmenu of nestedMenues) {
        nestedmenu.addEventListener("click", toggleNest);
    }
}

function closeAllNests() {
    let nestedMenues = document.getElementsByClassName("nested-menu");
    for (let nestedMenu of nestedMenues) {
        let siblings = nestedMenu.parentElement.children;
        for (let sibling of siblings) {
            if (sibling === nestedMenu) {
                //alert("found self!");
            } else {
                sibling.style.display = "none";
            }
        }
    }
}

//whichever element is clicked, toggle its siblings
//to hidden or shown
function toggleNest(evt) {
    console.log("toggleNest called");
    let siblings = evt.target.parentElement.children;
    for (let sibling of siblings) {
        if (sibling === evt.target) {
            //alert("found self!");
        } else {
            console.log("sibling.style.display: " + sibling.style.display);
            if ((sibling.style.display === "none") || (sibling.style.display === "")) {
                sibling.style.display = "inherit";
            } else {
                sibling.style.display = "none";
            }
        }
    }
}
////////////////////user preferences in style/size
function changeFont(theElement) {
    console.log(theElement);
    let buttons = document.getElementsByTagName('button');
    let h1s = document.getElementsByTagName('h1');
    // let h2s=document.getElementsByTagName('h2');
    // let h3s=document.getElementsByTagName('h3');

    let id = theElement.id;
    if (id === "sans-button") {
        document.getElementsByTagName('html')[0].style.fontFamily = "Arial, Helvetica, sans-serif";
        for (let button of buttons) {
            button.style.fontFamily = "Arial, Helvetica, sans-serif";
            button.style.borderRadius = "5px";
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "5px";
        }
    }
    else if (id === "times-button") {
        document.getElementsByTagName('html')[0].style.fontFamily = "'Times New Roman', Times, serif";
        for (let button of buttons) {
            button.style.fontFamily = "'Times New Roman', Times, serif";
            button.style.borderRadius = "10px";
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "10px";
        }
    }
    else if (id === "courier-button") {
        document.getElementsByTagName('html')[0].style.fontFamily = "'Courier New', Courier, monospace";
        for (let button of buttons) {
            button.style.fontFamily = "'Courier New', Courier, monospace";
            button.style.borderRadius = "0px";
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "0px";
        }
    }
    else if (id === "increase-font") {
        let pageFontSize = document.getElementsByTagName('*')[0].style.fontSize;
        if (pageFontSize === "") {
            pageFontSize = "1rem";
        }
        let numberFontSize = Number(pageFontSize.replace("rem", ""));
        numberFontSize = numberFontSize * 1.1;
        pageFontSize = numberFontSize.toString() + "rem";

        document.getElementsByTagName('*')[0].style.fontSize = pageFontSize;

    }
    else if (id === "decrease-font") {
        let pageFontSize = document.getElementsByTagName('*')[0].style.fontSize;
        if (pageFontSize === "") {
            pageFontSize = "1rem";
        }
        let numberFontSize = Number(pageFontSize.replace("rem", ""));
        numberFontSize = numberFontSize / 1.1;
        pageFontSize = numberFontSize.toString() + "rem";

        document.getElementsByTagName('*')[0].style.fontSize = pageFontSize;
    }

}
//expands all content, button navigation not needed
function processShowAllCheckBox() {
    let thisCheckBox = document.getElementById("show-all-checkbox");
    if (thisCheckBox.checked) {
        let mains = document.getElementsByTagName("main");
        for (let main of mains) {
            main.style.display = "block";
        }
        setSizeOfAsciiMap(320);
        disableMainNavButtons(true);
    }
    else {
        showMain("bible");
        disableMainNavButtons(false);
    }
}
function disableMainNavButtons(disable = true) {
    readingButton.disabled = disable;
    bibleButton.disabled = disable;
    dictionaryButton.disabled = disable;
    commentaryButton.disabled = disable;
    mapButton.disabled = disable;
    helpButton.disabled = disable;
}
//shows the main section requested
function showMain(id) {
    if (document.getElementById("show-all-checkbox").checked === true) {
        return;
    }
    let mains = document.getElementsByTagName("main");
    for (let main of mains) {
        if (main.id === id) {
            main.style.display = "block";
        }
        else {
            main.style.display = "none";
        }
    }
}

//------------------------------------
//ADDING EVENT LISTENERS TO PEOPLE, LOCATIONS, WORDS, AND REFERENCES AND PROCESSING THE CLICKS
////////////////////////////////////////
function addEventListenersToPeople() {//these are tagged spans in the definition markup
    let people = document.getElementsByClassName("definition-relatives");
    for (let person of people) {
        person.addEventListener("click", processPeopleClick);
    }
}
function addEventListenersToLocations() {//these are tagged spans in the definition markup
    let locations = document.getElementsByClassName("definition-location");
    for (let i = 0; i < locations.length; i++) {
        locations[i].addEventListener("click", processLocationClick);
    }
}
function addEventListenersToWords() {//these are tagged words in the Bible, Commentary, or dictionary
    let foundWords = document.getElementsByClassName("word");
    for (let i = 0; i < foundWords.length; i++) {
        foundWords[i].addEventListener("click", processWordClick);
    }
}
function addEventListenersToReferences() {//these are tagged references in the dictionary and commentaries
    let foundRefs = document.getElementsByClassName("osis");
    for (let i = 0; i < foundRefs.length; i++) {
        foundRefs[i].addEventListener("click", processOsisRefClick);
    }
}
//PROCESSING
function processPeopleClick(evt) {
    showMain('dictionary');
    showDictionaryEntry(evt);
}
function processLocationClick(evt) {
    showMain('map');
    setSizeOfAsciiMap(320);
    console.log(evt.target.innerHTML);
    let str = evt.target.parentElement.id.split("-refs-")[0];
    let latitude = evt.target.innerHTML.split(",")[0];
    let longitude = evt.target.innerHTML.split(",")[1];
    if (locationOffMap(latitude, longitude)) {
        document.getElementById("map-info").innerHTML = "(off map)" + str + ": " + evt.target.innerHTML;
    }
    else {
        document.getElementById("map-info").innerHTML = str + ": " + evt.target.innerHTML;
        plotDataPoint("o" + str, latitude, longitude);
    }
}
function processWordClick(evt) {
    showMain('dictionary');
    dictionaryInput.value = evt.target.innerHTML;
    showDictionaryEntry(evt);
}
function processOsisRefClick(evt) {
    showMain('bible');
    console.log("processOsisRefClick called: " + evt.target.innerHTML);
    bibleSelect.value = evt.target.innerHTML.split(".")[0] + "." + evt.target.innerHTML.split(".")[1];
    showBibleChapter();
}
//------------------------------------
//////////////////////////////////////////////
function showBibleChapter() {
    let bcv = bibleSelect.value;
    let book = bcv.split(".")[0];
    let chapter = bcv.split(".")[1];
    console.log(book, chapter);

    let chapterContents = "";
    chapterContents = "<h2>" + OSISTOFULLNAME[book].toUpperCase() + " " + chapter.toUpperCase() + "</h2>";
    for (let i = 0; i < 200; i++) {
        if (nestedBible[book][chapter][i.toString()] !== undefined) {
            let currentBCV = book + "." + chapter + "." + i.toString();
            if (PARAGRAPHLOCATIONS.includes(currentBCV) && (i > 1)) {
                chapterContents += "<br><br>";
            }
            if (HEADINGS[currentBCV] !== undefined) {
                chapterContents += "<h3>" + HEADINGS[currentBCV] + "</h3>";
            }
            chapterContents += "<sup>" + i.toString() + ".</sup>" + nestedBible[book][chapter][i.toString()];
        }
    }
    chapterContents = tagRefsAndWords(chapterContents, "<span class='osis'>", "</span>", "<span class='word'>", "</span>");
    bibleContents.innerHTML = chapterContents;
    addEventListenersToWords();
}

function processSeeCommentaryBtn() {
    showMain('commentary');
    commentarySelect.value = bibleSelect.value;
    showCommentaryChapter();
}
function showCommentaryChapter() {
    let contents = jfb[commentarySelect.value];
    contents = convertPlainText(contents);
    //contents = contents.replace(/\t{1,}/g, "&nbsp;&nbsp;&nbsp;&nbsp;");//replaces spaces
    //contents = contents.replace(/ {4,}/g, "&nbsp;&nbsp;&nbsp;&nbsp;");//replaces spaces
    //contents = contents.replace(/\n/g, "<br>");//replaces newlines with breaks
    contents = tagRefsAndWords(contents, "<span class='osis'>", "</span>", "<span class='word'>", "</span>");
    commentaryContents.innerHTML = contents;
    addEventListenersToWords();
    addEventListenersToReferences();
}

function showDictionaryEntry(evt) {
    // console.log("***************************");
    console.log("showDictionaryCalled", evt);
    // console.log(evt.target.classList);
    // console.log(evt.target.parentElement.id);
    console.log(evt.target.innerHTML);
    // console.log("***************************");

    ///Place the right word as the dictionary inpu
    if (evt.target.classList.contains("definition-relatives")) {//take number off if using relative
        let baseName = evt.target.innerHTML.replace(/\d/g, "").trim();
        dictionaryInput.value = baseName;
    }

    if (dictionaryInput.value.length < 1) { return; }// make sure a string length of at least 1 is present

    ///Make sure its capitalized
    dictionaryInput.value = dictionaryInput.value[0].toUpperCase() + dictionaryInput.value.slice(1);

    //handle no word in dictionary
    let wordIndex = dictionaryWords.indexOf(dictionaryInput.value);
    if (wordIndex === -1) {
        dictionaryContents.innerHTML = "Word not found!";
        return;
    }

    //
    let entries = eastons[wordIndex]["entries"]; //eastons nested dictionary word lookup
    let str = ""; //for building html contents
    let senderRefArrayStr = ""; //a csv string of osis references from sending event
    let referenceFound = false; //a flag that will stop searching once a reference is dound
    let bestWordToOpen = ""; //
    let bestId = ""; //the id of a div that should be opened
    let referencesCount = 0;
    let matchKnown = false;

    if (evt.target.parentElement.id.indexOf("-refs-") !== -1) {//event is coming from contents of definition
        senderRefArrayStr = evt.target.parentElement.id.split("-refs-")[1];
    }

    else if (evt.target.parentElement.id === "bible-contents") {//event is coming from bible chapter verse
        senderRefArrayStr = bibleSelect.value;

    } else if (evt.target.parentElement.id === "commentary-contents") {//event coming from commentary
        senderRefArrayStr = commentarySelect.value;
    }

    if (entries.length === 1) {//there is only one entry, so open that entry
        bestId = entries[0]["Entry"].split(" ").join("-") + "-refs-" + entries[0]["References"];
        referenceFound = true;
        //matchKnown=true;
    }

    let entriesMatching = 0;

    //console.log(entries);
    for (let i = 0; i < entries.length; i++) {

        let id = entries[i]["Entry"].split(" ").join("-") + "-refs-" + entries[i]["References"];

        if (evt.target.classList.contains("definition-relatives")) {//event coming from a person click
            if (entries[i]["Entry"] === evt.target.innerHTML) {//name matches entry best id knwn
                console.log("coming from a person click");
                bestId = id;
                matchKnown = true;
                entriesMatching = 1;
            }
        }
        //start building contents of dictionary entry
        str += "<div><span class='definition-entry nested-menu'>" + entries[i]["Entry"] + "</span><div id='" + id + "'>";

        let contents = "";
        let entryProperties = Object.keys(entries[i]);
        for (let j = 0; j < entryProperties.length; j++) {

            if (entryProperties[j] === "Entry") {
                //do nothing, entry already listed
            }
            else {
                str += "<b>" + entryProperties[j] + "</b>: "
                contents = entries[i][entryProperties[j]];
                if (entryProperties[j] === "References") {
                    referencesCount = 0;
                    //go through each reference and tag them, that is the main purpose of loop
                    let refsArray = contents.split(",");
                    {
                        for (let k = 0; k < refsArray.length; k++) {
                            //also while looping see if the reference is in the senders references
                            //if so make note of a match.
                            if (matchKnown === false) {//only look if not already found

                                let refsBCV = refsArray[k].split(".");//removing the verse just match by book chap
                                let refsBC = refsBCV[0] + "." + refsBCV[1];
                                //console.log("checking for ",refsBC,"in",senderRefArrayStr);
                                if (senderRefArrayStr.includes(refsBC)) {
                                    console.log("Found!" + refsBC);
                                    bestWordToOpen = entries[i]["Entry"];
                                    bestId = id;
                                    //referenceFound = true;
                                    referencesCount += 1;
                                }
                            }
                            refsArray[k] = "<span class='osis'>" + refsArray[k] + "</span>";
                        }
                    }
                    contents = refsArray.join(", ");
                }
                else if (entryProperties[j] === "Definition") {
                    contents = tagRefsAndWords(contents, "<span class='osis'>", "</span>", "<span class='word'>", "</span>");
                }

                else if (entryProperties[j] === "Entry") {
                    contents = "<span class='definition-entry'>" + contents + "</span>";
                }
                else if (entryProperties[j] === "Location") {
                    contents = "<span class='definition-location'>" + contents + "</span>";
                }
                else if (
                    (entryProperties[j] === "Father") ||
                    (entryProperties[j] === "Children") ||
                    (entryProperties[j] === "Siblings") ||
                    (entryProperties[j] === "Mother") ||
                    (entryProperties[j] === "Father") ||
                    (entryProperties[j] === "Partners") ||
                    (entryProperties[j] === "Half Siblings Same Mother") ||
                    (entryProperties[j] === "Half Siblings Same Father")
                ) {
                    let contentsSplit = contents.split(",");
                    for (let k = 0; k < contentsSplit.length; k++) {
                        contentsSplit[k] = "<span class='definition-relatives'>" + contentsSplit[k] + "</span>";
                    }
                    contents = contentsSplit.join(", ");
                }
            }
            str += contents;
            str += "<br>";
        }
        if (referencesCount > 0) {
            entriesMatching += 1;
        };
        str += "<br>";
        str += "</div></div>";
    }
    console.log("Number of matches: " + entriesMatching);
    dictionaryContents.innerHTML = str;
    addEventListenersToWords();
    addEventListenersToPeople();
    addEventListenersToReferences();
    addEventListenersToLocations();
    addEventListenersToNestedMenues();
    if (evt.target.id === "dictionary-word-load") {
        //dictionary-word-load button pressed, so leave open all words
    }
    else {
        closeAllNests();
    }
    if ((bestId !== "") && (entriesMatching === 1)) { //must have just one match to open
        document.getElementById(bestId).style.display = "unset";
    }
}

//takes a section of text and adds around osis references and eastons words
function tagRefsAndWords(contents, osisStartTag, osisEndTag, wordStartTag, wordEndTag) {
    let words = dictionaryWords;
    function replacerFunction(something) {
        console.log(something);
    }
    for (let i = 0; i < osis.length; i++) {
        if (osis[i].length > 1) {
            //take care of osis tags
            let regexstring = "\\b" + osis[i] + "\\.\\d?\\d?\\d?\\b";
            let regexp = new RegExp(regexstring, "g");
            contents = contents.replace(regexp, "OSISSTARTTAG" + "$&" + "OSISENDTAG");
        }
    }
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 1) {
            //take care of words tags
            let regexstring = "\\b" + words[i] + "\\b";
            let regexp = new RegExp(regexstring, "g");
            contents = contents.replace(regexp, "WORDSTARTTAG" + words[i] + "WORDENDTAG");
            regexstring = "\\b" + words[i].toLowerCase() + "\\b";
            regexp = new RegExp(regexstring, "g");
            contents = contents.replace(regexp, "WORDSTARTTAG" + words[i].toLowerCase() + "WORDENDTAG");
        }
    }
    contents = contents.replace(/OSISSTARTTAG/g, osisStartTag).replace(/OSISENDTAG/g, osisEndTag);
    contents = contents.replace(/WORDSTARTTAG/g, wordStartTag).replace(/WORDENDTAG/g, wordEndTag);
    return contents;
}
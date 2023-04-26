"use strict";

//Build the commentary select options from the keys.
function buildCommentarySelectOptions() {//**will change if not local */
    let str = "";
    for (let i = 0; i < jfbKeys.length; i++) {
        //console.log(jfbKeys[i]);
        let bookChapter = jfbKeys[i].split(".")[0] + " " + jfbKeys[i].split(".")[1];
        str += "<option value='" + jfbKeys[i] + "'>" + bookChapter + "</option>";
    }

    // let strBookHTML="";
    // let currentBook=jfbKeys[i].split(".")[0];

    // for (let i=0;jfbKeys.length;i++){

    

    // }

    commentarySelect.innerHTML = str;
    console.log("jfbKeys");
    console.log(jfbKeys);
}

//Build the Bible select options
function buildBibleSelectOptions() {//**will change if not local */
    let str = "";
    for (let i = 0; i < osis.length; i++) {
        //console.log(osis[i]);
        let bookChapter = osis[i].split(".")[0] + " " + osis[i].split(".")[1];
        str += "<option value='" + osis[i] + "'>" + bookChapter + "</option>";
    }
    bibleSelect.innerHTML = str;
}

//Build the search input for the dictionary
function buildSearchInputsForDictionary() {//**will change if not local */
    let str = "";
    for (let i = 0; i < dictionaryWords.length; i++) {
        str += "<option value='" + dictionaryWords[i] + "'>";
    }
    document.getElementById("bible-words").innerHTML = str;
}


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
            "<td><ul id='reading-ul-" + intDay.toString() + "'><input type='checkbox' id='reading-check-" +
            intDay.toString() +
            "'><label><b>" +
            intDay.toString() +
            "</b></label></li>";


        //getDateString
        //change dateString to date object
        //add/subtract of number of days
        //change new date to DateString


        readingTable +=
            "<li class='day-of-year' style='display:none'>" +

            //newDateString+
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

function _shiftDates() {
    let shiftInteger = parseInt(document.getElementById("shift-by-integer").value);
    if (!isNaN(shiftInteger)) {
        shiftDates(shiftInteger);
    }
}

function resetDates() {
    let now = new Date();
    let today = getTodaysDate();
    let currentYear = now.getFullYear();
    for (let i = 1; i < 366; i++) {
        let parentElement = document.getElementById("reading-ul-" + i.toString());
        if (parentElement !== null) {
            let children = parentElement.children;
            for (let child of children) {
                if (child.classList.contains("day-of-year")) {
                    child.innerHTML = getDateString(currentYear, i);
                    if (child.innerText === today) {
                        //console.log("today found! at", today);
                        child.style.backgroundColor = "orange";
                    }
                    else { //if app open spans more than one day turns off orange
                        child.style.backgroundColor = "unset";
                    }
                    //return (child.innerText);
                }
            }
        }
    }

}

function setLastCheckedToSomeDate(someDate) {
    let lastIndex = 1;
    for (let i = 366; i > 0; i--) {
        if (document.getElementById("reading-check-" + i.toString()) !== null) {
            //console.log(document.getElementById("reading-check-" + i.toString()));
            //console.log(document.getElementById("reading-check-" + i.toString()).checked);
            if (document.getElementById("reading-check-" + i.toString()).checked) {
                lastIndex = i;
                //console.log(lastIndex);
                let theDate = _getDateOfLastChecked(lastIndex);
                //console.log(theDate);
                let dateDiff = subtract2Dates(someDate, theDate);
                //console.log(dateDiff);
                shiftDates(dateDiff);
                return lastIndex;
            }
        }
    }

    let theDate = _getDateOfLastChecked(lastIndex);
    //console.log(theDate);
    let dateDiff = subtract2Dates(someDate, theDate);
    //console.log(dateDiff);
    shiftDates(dateDiff);
    //console.log(lastIndex);
    //_getDateOfLastChecked(lastIndex);
    //return lastIndex;
}

function setLastCheckedToToday() {
    let isChecked=false;
    for (let i = 0; i <366; i++) {
        if (document.getElementById("reading-check-" + i.toString()) !== null) {
            if (document.getElementById("reading-check-" + i.toString()).checked) {
                isChecked=true;
            }
        }
    }
    if (isChecked){
        let someDate = getTodaysDate();
        console.log(someDate);
        setLastCheckedToSomeDate(someDate);
    }

}

function _getDateOfLastChecked(lastChecked) {
    if (lastChecked !== -1) {
        let parentElement = document.getElementById("reading-ul-" + lastChecked.toString());
        let children = parentElement.children;
        for (let child of children) {
            if (child.classList.contains("day-of-year")) {
                console.log(child.innerText);
                return (child.innerText);
            }
        }
    }
    else {
        console.log(lastChecked);
        return -1;
    }
}

function subtract2Dates(dateString1, dateString2) {

    let year1 = parseInt(dateString1.split("-")[0]);
    let month1 = parseInt(dateString1.split("-")[1]) - 1;
    let date1 = parseInt(dateString1.split("-")[2]);

    let year2 = parseInt(dateString2.split("-")[0]);
    let month2 = parseInt(dateString2.split("-")[1]) - 1;
    let date2 = parseInt(dateString2.split("-")[2]);

    let dateObject1 = new Date(year1, month1, date1);
    let dateObject2 = new Date(year2, month2, date2);

    let oneDay = 1 * 60 * 60 * 24 * 1000;

    let timeDifference = dateObject1.getTime() - dateObject2.getTime();

    let dayDifference = parseInt(timeDifference / oneDay);
    console.log(typeof (dayDifference));

    console.log(dayDifference);
    return (dayDifference);

}

function shiftDates(shiftInteger) {
    let today = getTodaysDate();
    //console.log("attempting to shift dates by ", shiftInteger);
    //console.log(typeof (shiftInteger));
    let listedDates = document.getElementsByClassName("day-of-year");

    for (let listedDate of listedDates) {
        let thisDateString = listedDate.innerHTML;
        //console.log(thisDateString);
        // let thisDateString=getDateString(currentYear,intDay);
        let thisYear = parseInt(thisDateString.split("-")[0]);
        let thisMonth = parseInt(thisDateString.split("-")[1]) - 1;
        let thisDay = parseInt(thisDateString.split("-")[2]);

        // console.log(thisDateString);
        let newDateObject = new Date(thisYear, thisMonth, thisDay + shiftInteger);

        // console.log(newDate.getFullYear(), newDate.getMonth()+1,newDate.getDate());

        let newYear = newDateObject.getFullYear();
        let newMonth = newDateObject.getMonth() + 1;
        let newDate = newDateObject.getDate();
        //console.log(newYear, newMonth, newDate);

        let newDateString = newYear.toString() + "-";
        newDateString += ("0" + newMonth.toString()).slice(-2) + "-";
        newDateString += ("0" + newDate.toString()).slice(-2);

        listedDate.innerHTML = newDateString;

        if (listedDate.innerText === today) {
            //console.log("today found! at", today);
            listedDate.style.backgroundColor = "orange";
        }
        else { //if app open spans more than one day turns off orange
            listedDate.style.backgroundColor = "unset";
        }


    }


    // let thisDateString=getDateString(currentYear,intDay);
    // let thisYear=parseInt(thisDateString.split("-")[0]);
    // let thisMonth=parseInt(thisDateString.split("-")[1])-1;
    // let thisDay=parseInt(thisDateString.split("-")[2]);

    // console.log(thisDateString);
    // let newDate = new Date(thisYear,thisMonth,thisDay+shiftDay);

    // console.log(newDate.getFullYear(), newDate.getMonth()+1,newDate.getDate());

    // let newDateString=newDate.getFullYear().toString()+"-";
    // newDateString+=("0"+(newDate.getMonth()+1).toString()).slice(-2) + "-";
    // newDateString+=("0" + newDate.getDate().toString()).slice(-2);
    // console.log(newDateString);

}

function switchReadingPlans() {

    //CHRON -> OT/NT -> ST -> NTCHRON

    // if (document.getElementById("reading-plan-name").innerHTML === "Chronological") {
    //     loadReadingTable("Old Testament/New Testament", OTNTREADINGPLAN)
    // }
    // else if (document.getElementById("reading-plan-name").innerHTML === "Old Testament/New Testament") {
    //     loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
    // }
    // else if (document.getElementById("reading-plan-name").innerHTML === "Straight Through") {
    //     loadReadingTable("Chronological NT 260 Days", CHRONOLOGICALNT260);
    // }
    // else if (document.getElementById("reading-plan-name").innerHTML === "Chronological NT 260 Days") {
    //     loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
    // }
    // else {
    //     loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
    // }




    // if (true){
    if (confirm("Are you sure?\nPlease save any reading plan data before switching.")) {
        //console.log("run switching mechanism");
        //console.log(document.getElementById("reading-plan-name").innerHTML);


        if (document.getElementById("reading-plan-name").innerHTML === "Chronological") {
            loadReadingTable("Old Testament/New Testament", OTNTREADINGPLAN)
        }
        else if (document.getElementById("reading-plan-name").innerHTML === "Old Testament/New Testament") {
            loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
        }
        else if (document.getElementById("reading-plan-name").innerHTML === "Straight Through") {
            loadReadingTable("Chronological NT 260 Days", CHRONOLOGICALNT260);
        }
        else if (document.getElementById("reading-plan-name").innerHTML === "Chronological NT 260 Days") {
            loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
        }
        else {
            loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
        }
        document.getElementById("reading-menu").style.display="none";    


        // if (document.getElementById("reading-plan-name").innerHTML === "Old Testament/New Testament") {
        //     loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
        // }
        // else if (document.getElementById("reading-plan-name").innerHTML === "Chronological") {
        //     loadReadingTable("Old Testament/New Testament", OTNTREADINGPLAN);
        // }
        // else {
        //     loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
        // }
        // document.getElementById("reading-menu").style.display="none";
    }




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

    if (showDates===true){
        document.getElementById("reading-menu").style.display="inherit";
        // document.getElementById("reset-dates").style.display="inherit";
        // document.getElementById("switch-reading-plans").style.display="inherit";
        // <button id="last-check-to-today-button" class="initial-close">Shift Dates</button>
        // <button id="reset-dates" class="initial-close">Reset Shift</button>
        // <button id="switch-reading-plans" class="initial-close">Switch Plans</button>
    }
    else{
        document.getElementById("reading-menu").style.display="none";
        // document.getElementById("reset-dates").style.display="none";
        // document.getElementById("switch-reading-plans").style.display="none"
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
    let lastCheckedIndex = -1;
    let lastCheckedDate = "";
    for (let i = 1; i < 366; i++) {
        let checkBoxId = "reading-check-" + i.toString();
        if ((document.getElementById(checkBoxId) != null)) {
            let checkBox = document.getElementById(checkBoxId);
            //console.log(checkBoxId, checkBox.checked);
            saveData[checkBoxId] = checkBox.checked;
            if (checkBox.checked) {
                lastCheckedIndex = i;
            }
        }
    }
    lastCheckedDate = _getDateOfLastChecked(lastCheckedIndex);
    saveData["show-dates"] = showDates;
    saveData["reading-plan-name"] = document.getElementById("reading-plan-name").innerText;

    saveData["font-family"] = document.getElementsByTagName('html')[0].style.fontFamily;
    saveData["border-radius"] = document.getElementsByTagName('h1')[0].style.borderRadius;
    saveData["font-size"] = document.getElementsByTagName('*')[0].style.fontSize;
    saveData["last-checked-index"] = lastCheckedIndex;
    saveData["last-checked-date"] = lastCheckedDate;


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
            //console.log(readingPlanData);


            if (readingPlanData["reading-plan-name"] === "Old Testament/New Testament") {
                loadReadingTable("Old Testament/New Testament", OTNTREADINGPLAN);
            }
            else if (readingPlanData["reading-plan-name"] === "Straight Through") {
                loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
            }
            else if (readingPlanData["reading-plan-name"] === "Chronological NT 260 Days") {
                loadReadingTable("Chronological NT 260 Days", CHRONOLOGICALNT260);
            }
            //loadReadingTable("Chronological NT 260 Days", CHRONOLOGICALNT260);


            else {
                loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
            }

            //console.log(readingPlanData);
            for (let readingDay in readingPlanData) {
                let checkBoxId = readingDay;
                if (document.getElementById(checkBoxId) != undefined) {
                    document.getElementById(checkBoxId).checked =
                        readingPlanData[readingDay];
                }
            }
            if (readingPlanData["last-checked-date"]!==-1){
                setLastCheckedToSomeDate(readingPlanData["last-checked-date"]);
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
                    document.getElementById("reading-menu").style.display="inherit";
                } else {
                    console.log("calling hideReadingDates");
                    hideReadingDates();
                    document.getElementById("reading-menu").style.display="none";
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
            if (readingPlanData["border-radius"] != undefined){
                document.getElementById("shift-by-integer").style.borderRadius=readingPlanData["border-radius"];
            }

            if (readingPlanData["font-size"] != undefined) {
                document.getElementsByTagName('*')[0].style.fontSize = readingPlanData["font-size"];
            }

        };
        fileReader.readAsText(fileInput, "UTF-8");
    });
    inputTypeIsFile.click();
}

function refreshReadingDates() {
    if (readingPlanData["reading-plan-name"] === "Old Testament/New Testament") {
        loadReadingTable("Old Testament/New Testament", OTNTREADINGPLAN);
    }
    else if (readingPlanData["reading-plan-name"] === "Straight Through") {
        loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
    }
    else if (readingPlanData["reading-plan-name"] === "Straight Through") {
        loadReadingTable("Straight Through", STRAIGHTREADINGPLAN);
    }
    else if (readingPlanData["reading-plan-name"] === "Chronological NT 260 Days") {
        loadReadingTable("Chronological NT 260 Days", CHRONOLOGICALNT260);
    }
    


    else {
        loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
    }

}

function loadReadingTable(title, readingPlanObject) {
    readingPlanTable.innerHTML = makeReadingTable(readingPlanObject);
    document.getElementById("reading-plan-name").innerHTML = title;
    //****************changed */
    showDates = false;
    //********************************** */
    addEventListenersToReferences();
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

function stop() {
    warnNoSynth();
    myPauseProperty = false;
    synth.cancel(currentUtter);
}
function play() {
    warnNoSynth();
    if ((myPauseProperty === true) && (synth.speaking === true)) {//alredy started not ended
        //speech somewhere in the middle, and paused, needs resumed
        synth.resume();
        myPauseProperty = false;
    }
    else if (synth.speaking === false) {
        let myText = document.getElementById("bible-contents").innerText;
        myText = myText.replace(/\d\d?\d?\./g, " "); //remove verse numbers

        // https://stackoverflow.com/questions/18087416/split-string-in-half-by-word
        // https://stackoverflow.com/users/69083/guffa
        let middle = Math.floor(myText.length / 2);
        let before = myText.lastIndexOf('. ', middle);
        let after = myText.indexOf('. ', middle);
        
        if (middle - before < after - middle) {
            middle = before;
        } else {
            middle = after;
        }
        
        var myText1 = myText.substring(0, middle + 1);
        var myText2 = myText.substring(middle+1);

        console.log(myText1);
        console.log(myText2);


        //not started or has ended, expects to start play
        utterThis1 = new SpeechSynthesisUtterance(myText1);
        utterThis1.addEventListener("end",actOnUtter1End);
        utterThis2 = new SpeechSynthesisUtterance(myText2);

        let currentUtter=utterThis1;
        
        synth.speak(currentUtter);
        
        
        myPauseProperty = false;
    }
}

function actOnUtter1End(){
    if ((myPauseProperty===false)&&(true)){
        let currentUtter=utterThis2;
        synth.speak(currentUtter);
    }
}




function pause() {
    warnNoSynth();
    if ((myPauseProperty === true) && (synth.speaking === true)) {
        //speech somewhere in middle of phrase and paused, user wants unpause
        synth.resume();
        myPauseProperty = false;
    }
    else if ((myPauseProperty === false) && (synth.speaking === true)) {
        //speech somewhere in middle of phrase and unpaused, user wants pause
        synth.pause()
        myPauseProperty = true;
    }
}
function warnNoSynth() {
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

function clearAllLocations() {
    clearBullsEyes();
    clearBackgroundLocations();
}



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
            if (!button.classList.contains("narrow")) {
                button.style.borderRadius = "5px";
            }
            else {
                console.log(button.innerHTML);
                if (button.innerHTML === "&lt;") {
                    button.style.borderRadius = "5px 0px 0px 5px";
                }
                else if (button.innerHTML === "&gt;") {
                    button.style.borderRadius = "0px 5px 5px 0px";
                }
            }
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "5px";
        }
        document.getElementById("shift-by-integer").style.borderRadius ="5px";
    }
    else if (id === "times-button") {
        document.getElementsByTagName('html')[0].style.fontFamily = "'Times New Roman', Times, serif";
        for (let button of buttons) {
            button.style.fontFamily = "'Times New Roman', Times, serif";
            if (!button.classList.contains("narrow")) {
                button.style.borderRadius = "5px";
            }
            else {
                console.log(button.innerHTML);
                if (button.innerHTML === "&lt;") {
                    button.style.borderRadius = "5px 0px 0px 5px";
                }
                else if (button.innerHTML === "&gt;") {
                    button.style.borderRadius = "0px 5px 5px 0px";
                }
            }
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "10px";
        }
        document.getElementById("shift-by-integer").style.borderRadius ="5px";
    }
    else if (id === "courier-button") {
        document.getElementsByTagName('html')[0].style.fontFamily = "'Courier New', Courier, monospace";
        for (let button of buttons) {
            button.style.fontFamily = "'Courier New', Courier, monospace";
            if (!button.classList.contains("narrow")) {
                button.style.borderRadius = "0px";
            }
            else {
                console.log(button.innerHTML);
                if (button.innerHTML === "&lt;") {
                    // button.style.borderRadius = "5px 0px 0px 5px";
                    button.style.borderRadius = "0px 0px 0px 0px";
                }
                else if (button.innerHTML === "&gt;") {
                    // button.style.borderRadius = "0px 5px 5px 0px";
                    button.style.borderRadius = "0px 0px 0px 0px";
                }
            }
        }
        for (let h1 of h1s) {
            h1.style.borderRadius = "0px";
        }
        document.getElementById("shift-by-integer").style.borderRadius ="0px";
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

function toggleRedLetters() {
    console.log("toggle red letters");
    if (document.getElementById("show-red-letters").checked === true) {
        useRedLetters = true;
        console.log("should use");
        showBibleChapter();
    }
    else {
        useRedLetters = false;
        console.log("don't use");
        showBibleChapter();
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
    // dictionaryInput.value = evt.target.innerHTML;
    showDictionaryEntry(evt);
}
function processOsisRefClick(evt) {
    showMain('bible');
    console.log("processOsisRefClick called: " + evt.target.innerHTML);
    let book=evt.target.innerHTML.split(".")[0];
    let chapter=evt.target.innerHTML.split(".")[1];
    bibleBookSelect.value=book;
    bibleChapterSelect.value=chapter;
    //bibleSelect.value = evt.target.innerHTML.split(".")[0] + "." + evt.target.innerHTML.split(".")[1];
    
    showBibleChapterUsingDoubleSelect();
    //showBibleChapter();
}
//------------------------------------
//////////////////////////////////////////////


function processSeeCommentaryBtn() {
    let chapter=bibleChapterSelect.value;
    let book=bibleBookSelect.value;
    if (chapter===""){
        return;
    }


    commentaryBookSelect.value=book;
    commentaryChapterSelect.value=chapter;

    showCommentaryChapterUsingDoubleSelect();

    showMain('commentary');
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
function backOneChapterBible() {
    if (bibleChapterSelect.value===""){
        return;
    }
    let osisValue = bibleBookSelect.value + "." + bibleChapterSelect.value;
    let currentIndex = osis.indexOf(osisValue);
    if (currentIndex > 0) {
        bibleBookSelect.value=osis[currentIndex - 1].split(".")[0];
        bibleChapterSelect.value=osis[currentIndex - 1].split(".")[1];
        showBibleChapterUsingDoubleSelect();
    }
}
function forwardOneChapterBible() {
    if (bibleChapterSelect.value===""){
        return;
    }
    let osisValue = bibleBookSelect.value + "." + bibleChapterSelect.value;
    let currentIndex = osis.indexOf(osisValue);
    if (currentIndex < osis.length - 1) {
        bibleBookSelect.value=osis[currentIndex + 1].split(".")[0];
        bibleChapterSelect.value=osis[currentIndex + 1].split(".")[1];
        showBibleChapterUsingDoubleSelect();
    }
}
function backOneChapterCommentary() {
    if (commentaryChapterSelect.value===""){
        return;
    }
    let osisValue = commentaryBookSelect.value + "." + commentaryChapterSelect.value;
    let currentIndex = osis.indexOf(osisValue);
    if (currentIndex > 0) {
        commentaryBookSelect.value=osis[currentIndex - 1].split(".")[0];
        commentaryChapterSelect.value=osis[currentIndex - 1].split(".")[1];
        showCommentaryChapterUsingDoubleSelect();
    }
}
function forwardOneChapterCommentary() {
    if (commentaryChapterSelect.value===""){
        return;
    }
    let osisValue = commentaryBookSelect.value + "." + commentaryChapterSelect.value;
    let currentIndex = osis.indexOf(osisValue);
    if (currentIndex < osis.length - 1) {
        commentaryBookSelect.value=osis[currentIndex + 1].split(".")[0];
        commentaryChapterSelect.value=osis[currentIndex + 1].split(".")[1];
        showCommentaryChapterUsingDoubleSelect();
    }
}

///////////////////////////////////////////////////
"use strict";
/////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////
//Name important global elements
let readingPlanTable = document.getElementById("reading-plan-table");
let bibleSelect = document.getElementById("bible-select");
let bibleBookSelect = document.getElementById("bible-book-select");
let bibleChapterSelect = document.getElementById("bible-chapter-select");
let bibleContents = document.getElementById("bible-contents");
let commentarySelect = document.getElementById("commentary-select");
let commentaryChapterSelect = document.getElementById("commentary-chapter-select");
let commentaryBookSelect = document.getElementById("commentary-book-select");
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
let playingAudio = false;
let playButton = document.getElementById("play-audio");
playButton.addEventListener("click", play);
let pauseButton = document.getElementById("pause-audio");
pauseButton.addEventListener("click", pause);
let stopButton = document.getElementById("stop-audio");
stopButton.addEventListener("click", stop);
const synth = window.speechSynthesis;
let myPauseProperty = false;
let utterThis1;
let utterThis2;
let currentUtter;

let buttonSelectMaps = document.getElementsByClassName("btn-select-map");
let jfbKeys = [];//fill in later with function
let osis = [];//fill in later with function
let dictionaryWords = [];//fill in later with function
let useRedLetters = false;
//load map set size of map
asciiMap.innerHTML = BASEMAP;
setSizeOfAsciiMap(320);//sets to 320px
//Add event listeners to the Bible Selectn process
bibleSelect.addEventListener("input", showBibleChapter);


bibleBookSelect.addEventListener("input", populateBibleChapterSelect);

//populate Bible Chapter Select will find the greatest value of that bible book and fill in the chapter
bibleChapterSelect.addEventListener("input",showBibleChapterUsingDoubleSelect);

commentaryBookSelect.addEventListener("input",populateCommentaryChapterSelect);

commentaryChapterSelect.addEventListener("input",showCommentaryChapterUsingDoubleSelect);




//document.getElementById("refresh-bible-chapter").addEventListener("click", showBibleChapter);
document.getElementById("refresh-bible-chapter").addEventListener("click", showBibleChapterUsingDoubleSelect);
seeCommentaryButton.addEventListener("click", processSeeCommentaryBtn);
dictionaryWordLoadButton.addEventListener("click", showDictionaryEntry);
commentarySelect.addEventListener("input", showCommentaryChapterUsingDoubleSelect);
document.getElementById("refresh-commentary-chapter").addEventListener("click", showCommentaryChapterUsingDoubleSelect);
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
document.getElementById("bible-chapter-previous").addEventListener("click", backOneChapterBible);
document.getElementById("bible-chapter-next").addEventListener("click", forwardOneChapterBible);
document.getElementById("commentary-chapter-previous").addEventListener("click", backOneChapterCommentary);
document.getElementById("commentary-chapter-next").addEventListener("click", forwardOneChapterCommentary);
document.getElementById("show-red-letters").addEventListener("change", toggleRedLetters);
document.getElementById("last-check-to-today-button").addEventListener("click", setLastCheckedToToday);
document.getElementById("reset-dates").addEventListener("click", resetDates);

for (let button of buttonSelectMaps) {
    button.addEventListener("click", addBackgroundLocations);
}
window.onbeforeunload = askConfirm;
//Generate the keys to the JFB Commentary
generateJFBKeys();
//Build the commentary select options from the keys.
buildCommentarySelectOptions();
//Generate the osis keys from the nested Bible
buildOsisBibleKeys();  ////NEED TO CHANGE THIS TO GENERATE BASED ON NUM of chapters in each book
//Build the Bible select options
buildBibleSelectOptions();


//fill in the first Select option for books using double select
function buildBibleBookSelect(){
    //osis keys are build either by remote or local
        //osis keys are build either by remote or local

    //
    let str = "";
    for (let i = 0; i < OSISBOOKS.length; i++) {
        str += "<option value='" + OSISBOOKS[i] + "'>" + OSISBOOKS[i] + "</option>";
    }
    bibleBookSelect.innerHTML = str;
    bibleBookSelect.value="Gen";
    commentaryBookSelect.innerHTML = str;
    commentaryChapterSelect.value="Gen";
}
buildBibleBookSelect();


function populateBibleChapterSelect(){
    console.log("called");
    let book=bibleBookSelect.value;
    console.log("book is",book);
    let numberOfChapters=BOOKLENGTHS[book];
    console.log("number of chapters",numberOfChapters);
    let str = "";
    for (let i = 1; i < numberOfChapters+1; i++) {
        str += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
    }
    bibleChapterSelect.innerHTML = str;
    bibleChapterSelect.value="";
    bibleContents.innerHTML="Pick a chapter.";
    showBibleChapterUsingDoubleSelect();
}

function populateCommentaryChapterSelect(){
    let book=commentaryBookSelect.value;
    let str="";
    for (let i=0;i<200;i++){
        if (jfbKeys.includes(book+"."+i.toString())){
            console.log("includes",book+"."+i.toString());
            str += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
        }
    }
    commentaryChapterSelect.innerHTML=str;
    commentaryChapterSelect.value="";
    commentaryContents.innerHTML="Pick a chapter.";
    showCommentaryChapterUsingDoubleSelect();
}

function showCommentaryChapterUsingDoubleSelect(){
    console.log("called");
    let book = commentaryBookSelect.value;
    let chapter = commentaryChapterSelect.value;
    // console.log("chapter!!!!!!!!!!!!");
    // console.log(chapter);
    if (chapter===""){
        return;
    }
    console.log(book,typeof(book));
    console.log(chapter,typeof(chapter));
    let osisRef=book+"."+chapter;
    console.log(osisRef);
    commentarySelect.value=osisRef;
    showCommentaryChapter();

}

populateBibleChapterSelect();
populateCommentaryChapterSelect();

//populate Bible Chapter using double Select
function showBibleChapterUsingDoubleSelect(){
    console.log("called");
    let book = bibleBookSelect.value;
    let chapter=bibleChapterSelect.value;
    if (chapter===""){
        return;
    }
    console.log(book,typeof(book));
    console.log(chapter,typeof(chapter));
    let osisRef=book+"."+chapter;
    console.log(osisRef);
    bibleSelect.value=osisRef;
    showBibleChapter();
}

showBibleChapterUsingDoubleSelect();






//Generate the dictionary words from the Eastons Dictionary
generateDictionaryWords();
//Build the search input for the dictionary
buildSearchInputsForDictionary();
//----------------------------------------------
//load initial settings
bibleSelect.value = "Gen.1";
bibleBookSelect.value="Gen";
bibleChapterSelect.value="1";
showBibleChapter();
dictionaryInput.value = "Jerusalem";
dictionaryWordLoadButton.click();
commentarySelect.value = "Gen.1";
commentaryBookSelect.value="Gen";
commentaryChapterSelect.value="1";
showCommentaryChapter();
showMain('bible');
loadReadingTable("Chronological", CHRONOLOGICALREADINGPLAN);
makeFavicon("B", "white", "blue");
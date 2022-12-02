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

        for (readingChapter of dayArray) {
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
        if ((checkBox = document.getElementById(checkBoxId) != null)) {
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
            readingPlanData = JSON.parse(fileLoadedEvent.target.result);
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
            for (readingDay in readingPlanData) {
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



      //////////////////////////////////////////////////////////////
      //
      //                SECTION ENDS
      //
      //////////////////////////////////////////////////////////////
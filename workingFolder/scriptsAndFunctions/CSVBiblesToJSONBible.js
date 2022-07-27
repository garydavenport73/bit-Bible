//              CSV related functions                   //
function makeCSV(thisTable, saveWithHeader = true) { ////This one fixed
    let csvString = "";
    let tempString = "";
    let headers = thisTable["headers"];
    if (saveWithHeader === true) {
        //fill in header from object
        for (let header of headers) {
            //tempString = header.toString().replaceAll('"', '""'); //any interior " needs to be replaced with ""

            let needsReplaced = '"';
            let replacer = '""';
            tempString = tempString.split(needsReplaced).join(replacer);

            csvString += "\"" + tempString + "\","; //surround each field with quotes
        }
        csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line
    }
    //fill in body data
    let bodyData = thisTable["data"];
    let numberOfRows = bodyData.length;
    let numberOfColumns = headers.length;
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            //tempString = bodyData[i][headers[j]].toString().replaceAll('"', '""'); //any interior " needs to be replaced with ""
            let needsReplaced = '"';
            let replacer = '""';
            tempString = tempString.split(needsReplaced).join(replacer);
            csvString += "\"" + tempString + "\","; //surround each field with quotes
        }
        csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line
    }
    console.log(csvString);
    return (csvString);
}

function tokenMaker(intSize) {
    let token = "";
    let specialString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let index = 0;
    for (let i = 0; i < intSize; i++) {
        token += specialString[Math.floor(Math.random() * specialString.length)];
    }
    console.log(token);
    return token;
}

function readCSV(csvString, loadWithHeader = true) {
    //trim string
    csvString = csvString.trim();
    //make lines out of csvString
    let lines = csvString.split("\n");
    let newCSVArrayOfArrays = [];
    for (let i = 0; i < lines.length; i++) {
        //trim whitespace of each line
        lines[i] = lines[i].trim();
        //remove leading and trailing " character
        lines[i] = lines[i].slice(1, -1);
        //split by ","
        let tempRowArray = lines[i].split('","');
        //make randomString
        let randomString = tokenMaker(32);
        while (lines[i].includes(randomString) === true) { //tests to see if randomString already in line (seems unlikely)
            randomString = tokenMaker(32);
        };
        //join by a randome string (make real random string here)
        let newString = tempRowArray.join(randomString);
        //look for the double quotes around randomString that is where the "," ie "","" (CSV convention) was
        //newString = newString.replaceAll('"' + randomString + '"', '","');

        let needsReplaced = '"' + randomString + '"';
        let replacer = '","';

        newString = newString.split(needsReplaced).join(replacer);

        //split by randomString without the quotes
        tempRowArray = newString.split(randomString);
        //for each element in the row of elements, replace the "" with " CSV convention
        for (let j = 0; j < tempRowArray.length; j++) {
            //tempRowArray[j] = tempRowArray[j].replaceAll('""', '"');

            let needsReplaced = '""';
            let replacer = '"';

            tempRowArray[j] = tempRowArray[j].split(needsReplaced).join(replacer);


        }
        newCSVArrayOfArrays.push(tempRowArray); //add each row to the new array
    }
    //console.log(newCSVArrayOfArrays); //now we have a straight array of arrays of strings in a csv style grid
    //convert to headers and data.
    let headers = [];
    let data = [];
    if (newCSVArrayOfArrays.length > 0) {
        if (loadWithHeader === true) {
            headers = newCSVArrayOfArrays[0];
            if (newCSVArrayOfArrays.length > 1) {
                for (let i = 1; i < newCSVArrayOfArrays.length; i++) { //loop through rows
                    let tempRow = {};
                    for (let j = 0; j < newCSVArrayOfArrays[i].length; j++) { //loop through cells in rows
                        tempRow[headers[j]] = newCSVArrayOfArrays[i][j];
                    }
                    data.push(tempRow);
                }
            }
        } else {
            if (newCSVArrayOfArrays.length > 0) {
                for (let j = 0; j < newCSVArrayOfArrays[0].length; j++) {
                    headers.push("Column " + (j + 1).toString());
                }
                for (let i = 0; i < newCSVArrayOfArrays.length; i++) { //loop through rows
                    let tempRow = {};
                    for (let j = 0; j < newCSVArrayOfArrays[i].length; j++) { //loop through cells in rows
                        tempRow[headers[j]] = newCSVArrayOfArrays[i][j];
                    }
                    data.push(tempRow);
                }
            }
        }
    }

    let finalTable = {};
    finalTable["headers"] = headers;
    finalTable["data"] = data;
    //console.log(JSON.stringify(finalTable));
    return JSON.parse(JSON.stringify(finalTable));
}



function makeBible(bibleName, tableOfBibles) {
    let thisBible = {};
    for (let i = 0; i < tableOfBibles["data"].length; i++) {
        let osisRef = tableOfBibles["data"][i]["osisRef"];
        let verse = tableOfBibles["data"][i][bibleName];
        if (osisRef != "citation") {
            thisBible[osisRef] = verse;
        }
    }
    return thisBible;
}

function makeChapterBibleFromBible(jsonBible, osisReferencesArray) {

    let thisChapterBible = {};
    let currentBook = "Gen";
    let currentChapter = "1";
    let wholeChapterText = "";

    //go through all verses
    for (let i = 0; i < osisReferencesArray.length; i++) {
        //get osisRef
        let osisRef = osisReferencesArray[i];
        //split osisRef into book chapter verse
        let info = osisRef.split(".");
        book = info[0];
        let chapter = info[1];
        let verse = info[2];
        let verseText = jsonBible[osisRef];
        if (verseText != undefined) {
            //alert("nothing at :" + osisRef);
            //verseText = "!!!!!!!!!!!!!!UNDEFINED!!!!!!!!!!!!!!!!!!!";
            //see if there is a change
            if ((book != currentBook) || (chapter != currentChapter)) {
                console.log("===book and chapter====");
                console.log(currentBook, currentChapter);
                console.log(wholeChapterText);

                thisChapterBible[currentBook + "." + currentChapter] = wholeChapterText;

                currentBook = book;
                currentChapter = chapter;
                wholeChapterText = " [" + verse + "]" + verseText;
            } else { //no change just accumulate chapter
                wholeChapterText += " [" + verse + "]" + verseText;
            }
        }


    }

    //got to the end but no change in chapter, write last chapter
    console.log("===book and chapter====");
    console.log(currentBook, currentChapter);
    console.log(wholeChapterText);

    thisChapterBible[currentBook + "." + currentChapter] = wholeChapterText;
    console.log(thisChapterBible);
    saveStringToTextFile(JSON.stringify(thisChapterBible), "your" + "ChapterBible", ".json");
    return thisChapterBible;
}

let bibleAbbreviation = process.argv[2];

if (bibleAbbreviation != undefined) {
    const fs = require('fs');
    let allBiblesCSVString = fs.readFileSync("../../CSVBibles/CSVBibles.csv", "utf8");
    let allBiblesTable = readCSV(allBiblesCSVString, true);
    let thisBible = makeBible(bibleAbbreviation, allBiblesTable);
    fs.writeFileSync(bibleAbbreviation + "BibleNoWordTags.json", JSON.stringify(thisBible));
} else {
    console.log("You need to supply an Bible Abbreviation, (NASB, KJV, etc) as an argument.");
}

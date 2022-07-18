//              CSV related functions                   //
function makeCSV(thisTable, saveWithHeader = true) { ////This one fixed
    let csvString = "";
    let tempString = "";
    let headers = thisTable["headers"];
    if (saveWithHeader === true) {
        //fill in header from object
        for (let header of headers) {
            //tempString = header.toString().replaceAll('"', '""'); //any interior " needs to be replaced with ""
            let stringToReplace = '"';
            let replacer = '""';
            tempString = tempString.split(stringToReplace).join(replacer);
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
            let stringToReplace = '"';
            let replacer = '""';
            tempString = tempString.split(stringToReplace).join(replacer);
            csvString += "\"" + tempString + "\","; //surround each field with quotes
        }
        csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line
    }
    //console.log(csvString);
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

//needs rewritten to match above format
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

        let stringToReplace = '"' + randomString + '"';
        let replacement = '","';

        newString = newString.split(stringToReplace).join(replacement);

        //split by randomString without the quotes
        tempRowArray = newString.split(randomString);
        //for each element in the row of elements, replace the "" with " CSV convention
        for (let j = 0; j < tempRowArray.length; j++) {
            //tempRowArray[j] = tempRowArray[j].replaceAll('""', '"');
            let stringToReplace = '""';
            let replacer = '"';
            tempRowArray[j] = tempRowArray[j].split(stringToReplace).join(replacer);
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

function makeJSONBibleFromCSV(myCSVString) {
    //alert("load correct text first");
    let arrayOfObjectsBible = readCSV(myCSVString, true);
    //console.log(arrayOfObjectsBible);
    let jsonBible = {};

    for (let i = 0; i < arrayOfObjectsBible["data"].length; i++) {
        //console.log(arrayOfObjectsBible["data"][i]);
        let entry = arrayOfObjectsBible["data"][i];
        jsonBible[bookIndexToName[entry["Book"]] + "." + entry["Chapter"] + "." + entry["Verse"]] = entry["Text"];
    }
    //console.log(jsonBible);
    return jsonBible;
    //saveStringToTextFile(JSON.stringify(jsonBible), "jsonBible", ".json");
}

let filename = process.argv[2];
let bookIndexToName = {};
if (filename != undefined) {
    const fs = require('fs');
    bookIndexToName = { "1": "Gen", "2": "Exod", "3": "Lev", "4": "Num", "5": "Deut", "6": "Josh", "7": "Judg", "8": "Ruth", "9": "1Sam", "10": "2Sam", "11": "1Kgs", "12": "2Kgs", "13": "1Chr", "14": "2Chr", "15": "Ezra", "16": "Neh", "17": "Esth", "18": "Job", "19": "Ps", "20": "Prov", "21": "Eccl", "22": "Song", "23": "Isa", "24": "Jer", "25": "Lam", "26": "Ezek", "27": "Dan", "28": "Hos", "29": "Joel", "30": "Amos", "31": "Obad", "32": "Jonah", "33": "Mic", "34": "Nah", "35": "Hab", "36": "Zeph", "37": "Hag", "38": "Zech", "39": "Mal", "40": "Matt", "41": "Mark", "42": "Luke", "43": "John", "44": "Acts", "45": "Rom", "46": "1Cor", "47": "2Cor", "48": "Gal", "49": "Eph", "50": "Phil", "51": "Col", "52": "1Thess", "53": "2Thess", "54": "1Tim", "55": "2Tim", "56": "Titus", "57": "Phlm", "58": "Heb", "59": "Jas", "60": "1Pet", "61": "2Pet", "62": "1John", "63": "2John", "64": "3John", "65": "Jude", "66": "Rev" };

    const myCSVString = fs.readFileSync(filename, 'utf8');
    jsonBible = makeJSONBibleFromCSV(myCSVString);

    let saveFilename = filename.split(".csv").join("") + "Bible.json";

    fs.writeFileSync(saveFilename, JSON.stringify(jsonBible));
} else {
    console.log("Please supply filename (ie NIV.csv)");
}
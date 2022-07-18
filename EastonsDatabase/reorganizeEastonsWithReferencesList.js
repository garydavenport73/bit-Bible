function loopThroughEntries(eastonMaster) {
    let customDict = [];
    let wordObject = {}
    wordObject["word"] = eastonMaster[0]['fields']['termLabel'];
    wordObject["entries"] = [];
    let currentWord = eastonMaster[0]['fields']['termLabel'];
    //let tempRow = {};

    console.log(eastonMaster.length);
    for (let i = 0; i < eastonMaster.length; i++) {
        if (currentWord === eastonMaster[i]['fields']['termLabel']) {
            wordObject["entries"].push(eastonMaster[i]['fields']); //adding under same word
        } else { //new word
            customDict.push(JSON.parse(JSON.stringify(wordObject))); //save previous accumulation
            //console.log("New word!");
            wordObject = {}
            wordObject["word"] = eastonMaster[i]['fields']['termLabel'];
            wordObject["entries"] = [];
            wordObject["entries"].push(eastonMaster[i]['fields']);
            currentWord = eastonMaster[i]['fields']['termLabel']; //set current word to present
        }
    }
    //console.log("done making dictionary");
    console.log(customDict);
    return (JSON.parse(JSON.stringify(customDict)));
}

function addReferences(customDict, bibleVerseOsisRefArray) {
    // make an empty array for found verses
    let tempArray = [];
    // go through each entry in dictionary
    for (let i = 0; i < customDict.length; i++) { //loop through each word
        let wordEntries = customDict[i]["entries"];
        console.log("looping through", customDict[i]["word"]);
        for (let j = 0; j < wordEntries.length; j++) { //loop through each word meaning

            let definitionText = wordEntries[j]["dictText"];
            if (definitionText === undefined) { //just in case, set to ""
                wordEntries[j]["dictText"] = "";
                definitionText = wordEntries[j]["dictText"];
            }
            // go through each osisRef verse
            //console.log(bibleVerseOsisRefArray);
            for (let k = 0; k < bibleVerseOsisRefArray.length; k++) {
                let thisReference = bibleVerseOsisRefArray[k];

                if (typeof(definitionText) != "string") { //happened few times?
                    console.log("not string");;
                    console.log(wordEntries[j]);
                };
                if (definitionText.includes("#" + thisReference + ")")) { //this is format in definition
                    tempArray.push(thisReference);
                }
            }
            wordEntries[j]["verseReferences"] = (JSON.parse(JSON.stringify(tempArray))).join(); //add to word meaning entry
            tempArray = [];
        }
    }
    return (JSON.parse(JSON.stringify(customDict))); //return fresh copy
}

//this file requires easton.json, and osisReferencesArray.json in working base folder
const fs = require('fs');
const eastonMaster = JSON.parse(fs.readFileSync("easton.json", 'utf8'));
const bibleVerseOsisRefArray = JSON.parse(fs.readFileSync("osisReferencesArray.json", 'utf8'));
let customDictionary = loopThroughEntries(eastonMaster);
customDictionary = addReferences(customDictionary, bibleVerseOsisRefArray);
fs.writeFileSync("EastonsReorganizedWithReferencesList.json", JSON.stringify(customDictionary));
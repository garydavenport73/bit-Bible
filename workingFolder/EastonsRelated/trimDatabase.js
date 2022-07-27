// function trimDictionary() {
//     trimEntries();
//     console.log(trimmedDictionary);
//     trimPersonLookups();
//     console.log(trimmedDictionary);
//     trimPlaceLookups();
//     console.log(trimmedDictionary);
// }

function trimEntries(fullDictionary) {
    let trimmedDictionary = [];
    //go through every dictionary word
    //go through every entry
    //keep  //dictLookup,
    //termLabel
    //verseReferences
    //dictText
    //personLookup
    //placeLookup

    //go through every dictionary word

    for (let i = 0; i < fullDictionary.length; i++) {
        let tempObject = {};
        tempObject["word"] = fullDictionary[i]["word"];

        //go through every entry
        let trimmedEntries = [];
        for (let j = 0; j < fullDictionary[i]["entries"].length; j++) {
            //keep  //dictLookup,
            //termLabel
            //verseReferences
            //dictText
            //personLookup
            //placeLookup
            let trimmedEntry = {};

            trimmedEntry["dictLookup"] = fullDictionary[i]["entries"][j]["dictLookup"];
            //trimmedEntry["termLabel"] = fullDictionary[i]["entries"][j]["termLabel"];
            trimmedEntry["verseReferences"] = fullDictionary[i]["entries"][j]["verseReferences"];
            trimmedEntry["dictText"] = fullDictionary[i]["entries"][j]["dictText"];
            if (fullDictionary[i]["entries"][j]["personLookup"] != undefined) {
                trimmedEntry["personLookup"] = fullDictionary[i]["entries"][j]["personLookup"];
            }
            if (fullDictionary[i]["entries"][j]["placeLookup"] != undefined) {
                trimmedEntry["placeLookup"] = fullDictionary[i]["entries"][j]["placeLookup"];
            }
            console.log(trimmedEntry);

            trimmedEntries.push(JSON.parse(JSON.stringify(trimmedEntry)));
        }

        tempObject["entries"] = trimmedEntries;

        trimmedDictionary.push(JSON.parse(JSON.stringify(tempObject)));

    }


    return JSON.parse(JSON.stringify(trimmedDictionary));

}

function trimPersonLookups(trimmedDictionary) {
    //go through every entry in the trimmedDictionary
    for (let i = 0; i < trimmedDictionary.length; i++) {
        let entries = trimmedDictionary[i]["entries"];
        for (let j = 0; j < entries.length; j++) {
            console.log(entries[j]["personLookup"]);
            if (entries[j]["personLookup"] != undefined) {
                //entries[j]["personLookup"] = entries[j]["personLookup"]["personLookup"];

                //entries[j]["personLookup"] = entries[j]["personLookup"];

                //let tempObject = {};
                // let thisEntry = entries[j]["personLookup"];

                for (const key in entries[j]["personLookup"]) {
                    if ((key === "mother") ||
                        (key === "father") ||
                        (key === "partners") ||
                        (key === "children") ||
                        (key === "siblings") ||
                        (key === "halfSiblingsSameMother") ||
                        (key === "halfSiblingsSameFather")
                    ) {
                        //tempObject[key] = entries[j]["personLookup"][key];
                        entries[j][key] = (entries[j]["personLookup"][key]).join();

                    }
                }

                //reassign entries[j] to a smaller object
                //entries[j]["personLookup"] = tempObject;
                delete entries[j]["personLookup"];
            }
        }
    }
    //go through every entry
    //if there is a person lookup in the entry
    //set person lookup which is an object to a string person lookup
    return JSON.parse(JSON.stringify(trimmedDictionary));
}

function trimPlaceLookups(trimmedDictionary) {
    //go through every entry in the trimmedDictionary
    for (let i = 0; i < trimmedDictionary.length; i++) {
        let entries = trimmedDictionary[i]["entries"];
        for (let j = 0; j < entries.length; j++) {
            console.log(entries[j]["placeLookup"]);
            if (entries[j]["placeLookup"] != undefined) {
                //process here
                //let placeLookupObject = entries[j]["placeLookup"];

                //let latitude = placeLookupObject["latitude"];
                //let longitude = placeLookupObject["longitude"];

                let location = entries[j]["placeLookup"]["latitude"] + "," + entries[j]["placeLookup"]["longitude"];

                //let placeLookup = placeLookupObject["placeLookup"];
                //let tempObject = {}
                //tempObject["placeLookup"] = placeLookupObject["placeLookup"];
                //let strPlaceLookup=placeLookupObject["placeLookup"];
                //let str
                //entries[j]["placeLookup"] = entries[j]["personLookup"]["personLookup"];
                entries[j]["location"] = location;
                delete entries[j]["placeLookup"]; // = placeLookup;
            }
        }
    }
    //go through every entry
    //if there is a person lookup in the entry
    //set person lookup which is an object to a string person lookup
    return JSON.parse(JSON.stringify(trimmedDictionary));
}


const fs = require('fs');
const fullDictionary = JSON.parse(fs.readFileSync("EastonsReorganizedWithReferencesListAddedPlacesAndPeople.json", 'utf8'));
let trimmedDictionary = trimEntries(fullDictionary);
trimmedDictionary = trimPersonLookups(trimmedDictionary);
trimmedDictionary = trimPlaceLookups(trimmedDictionary);
fs.writeFileSync("finalDatabaseNeedsVerseChapterTags.json", JSON.stringify(trimmedDictionary));

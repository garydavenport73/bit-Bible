function addPlaces(customDictionary, places) {

    //loop through all entries in custom dictionary

    for (let i = 0; i < customDictionary.length; i++) { //loop through each word
        let wordObject = customDictionary[i];
        let entries = wordObject["entries"];

        for (let j = 0; j < entries.length; j++) { //loop through each word subtype
            //console.log(entries[j]);
            if (entries[j].hasOwnProperty("placeLookup")) {
                console.log(entries[j]["dictLookup"], "has placeLookup", entries[j]["placeLookup"]);
                let placeLookupArray = entries[j]["placeLookup"];

                for (let k = 0; k < placeLookupArray.length; k++) {
                    let placeTableIndex = findPlaceTableIndex(placeLookupArray[k]);
                    let tempRow = places[placeTableIndex]["fields"];
                    //console.log(tempRow);
                    entries[j]["placeLookup"] = JSON.parse(JSON.stringify(tempRow));
                }
            }
        }
    }
    return JSON.parse(JSON.stringify(customDictionary));
}

function findPlaceTableIndex(key) {
    for (let i = 0; i < places.length; i++) {
        if (places[i]["id"] === key) {
            return i;
        }
    }
}

//reads in reorganized list and adds places entries
const fs = require('fs');
let customDictionary = JSON.parse(fs.readFileSync("EastonsReorganizedWithReferencesList.json", 'utf8'));
let places = JSON.parse(fs.readFileSync("places.json", 'utf8'));

customDictionary = addPlaces(customDictionary, places);

fs.writeFileSync("EastonsReorganizedWithReferencesListAddedPlaces.json", JSON.stringify(customDictionary));
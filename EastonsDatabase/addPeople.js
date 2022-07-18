function addPeople(customDictionary, people) {
    //alert("called");

    //loop through all entries in custom dictionary

    for (let i = 0; i < customDictionary.length; i++) {
        let wordObject = customDictionary[i]
        let entries = wordObject["entries"];

        for (let j = 0; j < entries.length; j++) {
            //console.log(entries[j]);
            if (entries[j].hasOwnProperty("personLookup")) {
                console.log(entries[j]["dictLookup"], "has personLookup", entries[j]["personLookup"]);
                let personLookupArray = entries[j]["personLookup"];

                for (let k = 0; k < personLookupArray.length; k++) {
                    let peopleTableIndex = findPeopleTableIndex(personLookupArray[k]);
                    let tempRow = people[peopleTableIndex]["fields"];
                    //console.log(tempRow);
                    entries[j]["personLookup"] = JSON.parse(JSON.stringify(tempRow));
                }
            }
        }
    }
    return JSON.parse(JSON.stringify(customDictionary));
}


function findPeopleTableIndex(key) {
    for (let i = 0; i < people.length; i++) {
        if (people[i]["id"] === key) {
            return i;
        }
    }
}

//reads in reorganized list and adds places entries
const fs = require('fs');
let customDictionary = JSON.parse(fs.readFileSync("EastonsReorganizedWithReferencesListAddedPlaces.json", 'utf8'));
let people = JSON.parse(fs.readFileSync("modifiedPeople.json", 'utf8'));

customDictionary = addPeople(customDictionary, people);

fs.writeFileSync("EastonsReorganizedWithReferencesListAddedPlacesAndPeople.json", JSON.stringify(customDictionary));
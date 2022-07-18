//Needs people.json, easton.json in current directory, alters sibling, relatives, etc data id to names
const fs = require('fs');
let people = JSON.parse(fs.readFileSync("people.json", 'utf8'));
let modifiedPeople = JSON.parse(fs.readFileSync("people.json", 'utf8'));
let eastonMaster = JSON.parse(fs.readFileSync("easton.json", 'utf8'));

for (let i = 0; i < modifiedPeople.length; i++) {
    //console.log(modifiedPeople[i]);
    for (const key in modifiedPeople[i]["fields"]) {
        //console.log(key);
        if ((key === "mother") ||
            (key === "father") ||
            (key === "partners") ||
            (key === "children") ||
            (key === "siblings") ||
            (key === "halfSiblingsSameMother") ||
            (key === "halfSiblingsSameFather")
        ) {
            let relatives = modifiedPeople[i]["fields"][key];
            for (let j = 0; j < relatives.length; j++) {
                let relativesIndex = getPersonIndex(relatives[j], people);
                if (people[relativesIndex]["fields"]["eastons"] === undefined) {
                    console.log("not in eastons, name is:" + people[relativesIndex]["fields"]["name"] + "(no entry)");
                    relatives[j] = people[relativesIndex]["fields"]["name"] + "(no entry)"; //set the name to a dead end
                } else {
                    let eastonsID = people[relativesIndex]["fields"]["eastons"];
                    if (eastonsID.length != 1) { console.log("###################Length is ##############" + eastonsID.length) };
                    let eastonsIndex = getEastonsIndex(eastonsID[0], eastonMaster);
                    console.log("in eastons, name is: " + eastonMaster[eastonsIndex]["fields"]["dictLookup"]);
                    relatives[j] = eastonMaster[eastonsIndex]["fields"]["dictLookup"]; //set the name to the eastons key
                }
            }
        }

    }
}

function getPersonIndex(id, people) {
    for (let i = 0; i < people.length; i++) {
        if (people[i]["id"] === id) {
            return i;
        }
    }
    return -1;
}

function getEastonsIndex(eastonsID, eastonMaster) {
    for (let i = 0; i < eastonMaster.length; i++) {
        if (eastonMaster[i]["id"] === eastonsID) {
            return i;
        }
    }
    return -1;
}

fs.writeFileSync('modifiedPeople.json', JSON.stringify(modifiedPeople));
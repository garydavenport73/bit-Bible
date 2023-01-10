const fs = require('fs');

let otnt = JSON.parse(fs.readFileSync("CHRONOLOGICALREADINGPLAN.json", "utf8"));
console.log(otnt);

ntShort = {};
let j = 0;
for (let i = 274; i < 366; i++) {
    j += 1;
    let key = "Day " + i.toString();
    console.log(key, otnt[key]);
    let key2 = "Day " + j.toString();
    ntShort[key2] = otnt[key];
}
console.log(ntShort);

let k = 0;
let chaptersInOrder = {};
let checkForDuplicates = [];
for (let i = 1; i < 93; i++) {
    let key = "Day " + i.toString();
    let tempArray = ntShort[key].split(",");
    for (let j = 0; j < tempArray.length; j++) {
        k += 1;
        console.log(tempArray[j]);
        chaptersInOrder["Day " + k.toString()] = tempArray[j];
        checkForDuplicates.push(tempArray[j]);
    }
}

console.log(chaptersInOrder);
console.log(checkForDuplicates);
//console.log(chaptersInOrder.length);

function hasDuplicates(a) {
    const noDups = new Set(a);
    return a.length !== noDups.size;
}



// In JSON, values must be one of the following data types:

// a string
// a number
// an object (JSON object)
// an array
// a boolean
// null
function removeDuplicates(someArray) {
    let newArray = [];
    for (let i = 0; i < someArray.length; i++) {
        if (newArray.includes(someArray[i]) === false) {
            newArray.push(someArray[i]);
        }
    }
    return JSON.parse(JSON.stringify(newArray));
}

let smallArray = removeDuplicates(checkForDuplicates);

let finalObject={}
for (let i=0;i<smallArray.length;i++){
    finalObject["Day "+(i+1).toString()]=smallArray[i];
}

console.log("has duplicates", hasDuplicates(checkForDuplicates));
console.log("has duplicates", hasDuplicates(smallArray));
console.log(smallArray);
console.log(smallArray.length);

// let CHRONOLOGICALNT={};
// for (let i=0;i<chaptersInOrder.length;i++){
//     let key="Day "+i.toString();
//     CHRONOLOGICALNT[key]=
// }
fs.writeFileSync("CHRONOLOGICALNT260.json", JSON.stringify(finalObject), "utf8");

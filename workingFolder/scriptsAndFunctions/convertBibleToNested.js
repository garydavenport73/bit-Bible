let filename = process.argv[2];

if (filename != undefined) {
	console.log(filename);
} else {
    console.log("You need to supply the filename of json Bible with osis style bcv as keys.");
    console.log("\nFor example, {'Gen.1.1':'text here','Gen.1.2.:'text etc'}");
    return;
}


const fs = require('fs');

let osisReferencesArray = JSON.parse(fs.readFileSync("osisReferencesArray.json", "utf8"));
let bible = JSON.parse(fs.readFileSync("AMPBibleNoWordTags.json", "utf8"));

// newBSB[book][chapter][verse];
console.log(osisReferencesArray);
console.log(bible);

let newBible = {};
let currentBook="";
let currentChapter="";
let currentVerse="";
for (let i = 0; i < osisReferencesArray.length; i++) {

    let book=osisReferencesArray[i].split(".")[0];
    let chapter=osisReferencesArray[i].split(".")[1];
    let verse=osisReferencesArray[i].split(".")[2];

    if (currentBook!==book){//new book, add to books
        currentBook=book;
        newBible[currentBook]={};
        currentChapter="";
        currentVerse="";
    }

    if (currentChapter!==chapter){
        currentChapter=chapter;
        currentVerse="";
        newBible[currentBook][currentChapter]={};
    }

    if (currentVerse!==verse){
        currentVerse=verse;
        newBible[currentBook][currentChapter][currentVerse]=bible[osisReferencesArray[i]];
    }
}

console.log(newBible);


console.log(newBible["John"]["3"]["16"]);
console.log(newBible["Prov"]["13"]["12"]);
console.log(newBible["1John"]["3"]["16"]);


fs.writeFileSync(filename.replace(".json","")+"Nested.json",JSON.stringify(newBible),"utf8");

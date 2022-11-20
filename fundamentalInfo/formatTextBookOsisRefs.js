let filename = process.argv[2];

if (filename === undefined) {
    console.log("Please provide a filename.  It must be a .json file.");
    return;
}
destinationFilename="OsisRefs"+filename;
var bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;

const fs=require('fs');

let textBook=JSON.parse(fs.readFileSync(filename,"utf8"));
let newTextBook=textBook;

for (let chapter in newTextBook){
    console.log("*****PARSING: "+chapter);
    newTextBook[chapter]=parseText(newTextBook[chapter]);
    console.log(newTextBook[chapter]);
}

console.log("Writing do disk...");
fs.writeFileSync(destinationFilename,JSON.stringify(newTextBook),"utf8");
console.log("finished");

function parseText(textInput) {
    let bcv = new bcv_parser;

    bcv.set_options({consecutive_combination_strategy: "separate",sequence_combination_strategy: "separate"});

    console.log("getting ready to parse...")
    resultArray= bcv.parse(textInput).osis_and_indices();
    console.log("parsing finished...")

    let newText=textInput;

    console.log("getting ready to make replacements");
    for (let i=resultArray.length-1;i>=0;i--){

        let thisOsis=resultArray[i].osis;
        console.log("replacing "+thisOsis);
        let startIndex=resultArray[i].indices[0];
        let endIndex=resultArray[i].indices[1];
        newText=newText.slice(0,startIndex)+thisOsis+newText.slice(endIndex);
    }

    return newText;
}
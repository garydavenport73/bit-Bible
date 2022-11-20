var bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
const fs=require('fs');

let filename = process.argv[2];

if (filename===undefined){
    console.log("Please indicate a filename.");
    return;
}

let destinationFilename = process.argv[3];

if (destinationFilename===undefined){
    destinationFilename="osisParsed_"+filename;
}

console.log("Reading in file: "+filename);

let contents=fs.readFileSync(filename,"utf8");
console.log("Finished reading in.");

console.log("Parsing contents.  This may take a while...");
let parsedContents=parseText(contents);

console.log("Writing do disk...");
fs.writeFileSync(destinationFilename,parsedContents,"utf8");
fs.writeFileSync(destinationFilename+".js","let "+destinationFilename+"="+parsedContents+";","utf8");
console.log("finished");



function parseText(textInput) {

    let bcv = new bcv_parser;

    bcv.set_options({consecutive_combination_strategy: "separate",sequence_combination_strategy: "separate"});

    console.log("getting ready to parse...")
    resultArray= bcv.parse(textInput).osis_and_indices();
    console.log("parsing finished...")

    let newText=textInput;

    console.log("getting ready to make replacements from array");
    for (let i=resultArray.length-1;i>=0;i--){
        let thisOsis=resultArray[i].osis;
        console.log("replacing "+thisOsis);
        let startIndex=resultArray[i].indices[0];
        let endIndex=resultArray[i].indices[1];
        newText=newText.slice(0,startIndex)+thisOsis+newText.slice(endIndex);
    }

    return newText;
}




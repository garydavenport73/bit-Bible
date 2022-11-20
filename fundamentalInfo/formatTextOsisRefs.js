let filename = process.argv[2];

if (filename === undefined) {
    console.log("Please provide a filename.  It must be a .json file.");
    return;
}
destinationFilename="OsisRefs"+filename;
var bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;

const fs=require('fs');

let text=fs.readFileSync(filename,"utf8");

console.log("*****PARSING: "+text);
text=parseText(text);
console.log(text);

console.log("Writing do disk...");
fs.writeFileSync(destinationFilename,text,"utf8");
console.log("finished");

function parseText(textInput) {
    let bcv = new bcv_parser;

    bcv.set_options({consecutive_combination_strategy: "separate",sequence_combination_strategy: "separate"});

    console.log("getting ready to parse...")
    resultArray= bcv.parse(textInput).osis_and_indices();
    console.log("parsing finished...")

    let newTextInput=textInput;

    console.log("getting ready to make replacements");
    for (let i=resultArray.length-1;i>=0;i--){

        let thisOsis=resultArray[i].osis;
        console.log("replacing "+thisOsis);
        let startIndex=resultArray[i].indices[0];
        let endIndex=resultArray[i].indices[1];
        newTextInput=newTextInput.slice(0,startIndex)+thisOsis+newTextInput.slice(endIndex);
    }

    return newTextInput;
}
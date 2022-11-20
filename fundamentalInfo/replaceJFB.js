var bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;

const fs=require('fs');
//let jfb=fs.readFileSync("jfbFormatted.js","utf8");
let jfb=JSON.parse(fs.readFileSync("fjbFormattedReplacedAbbrev.json","utf8"));
let jfbNew=jfb;
//console.log(typeof(jfbNew));
//console.log(jfbNew);
//let replacements={"De":"Deut","Hsa":"Hos","Phl":"Phl","Hbr":"Heb"};


for (let chapter in jfbNew){
    console.log("*****PARSING: "+chapter);
    jfbNew[chapter]=parseText(jfbNew[chapter]);
    console.log(jfbNew[chapter]);
}

console.log("Writing do disk...");
fs.writeFileSync("jfbFormattedAbbrevRep2Osis.json",JSON.stringify(jfbNew),"utf8");
console.log("finished");
// for (let replaceme in replacements){
//     console.log(replaceme,replacements[replaceme]);
//     jfbNew=jfbNew.split(replaceme+" ").join(replacements[replaceme]+" ");
// }

// console.log(jfbNew);


function parseText(textInput) {
    //let textInput = document.getElementById("text-input").value;
    //let jfbChapter=jfb[commentarySelect.value];

    let bcv = new bcv_parser;

    bcv.set_options({consecutive_combination_strategy: "separate",sequence_combination_strategy: "separate"});
    //let parsedContent=bcv.parse(jfbChapter);

    //bcv.parse("John 3:16,18").osis_and_indices();
    //console.log(bcv);


    console.log("getting ready to parse...")
    resultArray= bcv.parse(textInput).osis_and_indices();
    console.log("parsing finished...")
    //console.log(resultArray);

    let newText=textInput;

    console.log("getting ready to make replacements");
    for (let i=resultArray.length-1;i>=0;i--){

        let thisOsis=resultArray[i].osis;
        console.log("replacing "+thisOsis);
        let startIndex=resultArray[i].indices[0];
        let endIndex=resultArray[i].indices[1];
        newText=newText.slice(0,startIndex)+thisOsis+newText.slice(endIndex);
    }

    //document.getElementById("text-result").innerText=newText;;

    return newText;
}


//jfbNew=parseText(jfbNew);
//fs.writeFileSync("fjbFormattedReplacedAbbrev2Osis.js",jfbNew,"utf8");

//fs.writeFileSync("test.txt",jfbNew,"utf8");


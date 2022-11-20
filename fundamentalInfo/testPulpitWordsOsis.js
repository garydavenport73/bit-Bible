const fs=require('fs');

let pulpit=JSON.parse(fs.readFileSync("wordTagsosisParsedPulpit.json","utf8"));

let keys=Object.keys(pulpit);
console.log(keys);

let bookChapterKeys=JSON.parse(fs.readFileSync("bookChapterKeys.json","utf8"));

let undefinedCount=0;
for (let i = 0; i < bookChapterKeys.length; i++) {
    let isItUndefined=(pulpit[bookChapterKeys[i]]===undefined);
    console.log("undefined ",isItUndefined);
    if (isItUndefined===undefined){
        alert("undefined!");
    } 
    //console.log(pulpit[bookChapterKeys[i]]===undefined);   
}


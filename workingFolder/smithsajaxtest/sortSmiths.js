const fs = require('fs');

let sortedWords=JSON.parse(fs.readFileSync("wordlistarraysorted.json"));
let smithsUnsorted=JSON.parse(fs.readFileSync("smithsUnsorted.json"));
let smithsHTMLUnsorted=JSON.parse(fs.readFileSync("smithsHTMLUnsorted.json"));
let smithsSorted={};
let smithsHTMLSorted={};
//console.log(sortedWords);
//console.log(smithsUnsorted);

for (let i = 0; i < sortedWords.length; i++) {
    console.log(sortedWords[i]);
    smithsHTMLSorted[sortedWords[i]]=smithsHTMLUnsorted[sortedWords[i]];
}

console.log(smithsHTMLSorted);

fs.writeFileSync("smithsHTMLSorted.json",JSON.stringify(smithsHTMLSorted),"utf8");
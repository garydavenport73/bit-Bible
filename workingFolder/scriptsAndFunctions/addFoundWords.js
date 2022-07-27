let filename = process.argv[2];

if (filename != undefined) {
	console.log(filename);
	
    //const fs = require('fs');
    //let allBiblesCSVString = fs.readFileSync("../CSVBibles/byOsisRef/CSVBibles.csv", "utf8");
    //let allBiblesTable = readCSV(allBiblesCSVString, true);
    //let thisBible = makeBible(bibleAbbreviation, allBiblesTable);
    //fs.writeFileSync(bibleAbbreviation + "Bible.json", JSON.stringify(thisBible));
} else {
    console.log("You need to supply an Bible Abbreviation, (NASB, KJV, etc) as an argument.");
}


const fs = require('fs');
let verseBible = JSON.parse(fs.readFileSync(filename, "utf8"));
let eastons=JSON.parse(fs.readFileSync("finalDatabase.json", "utf8"));

console.log(verseBible);
console.log(eastons);

let words=[];
for (let i=0;i<eastons.length;i++){
    console.log(eastons[i]["word"]);
    words.push(eastons[i]["word"]);
} 
console.log(words);

words.sort(function(a, b){
  // ASC  -> a.length - b.length
  // DESC -> b.length - a.length
  return b.length - a.length;
});

console.log(words);


//go through every verse in the Bible
for (osisRef in verseBible){
	console.log(osisRef,verseBible[osisRef]);
	for (let i=0;i<words.length;i++){
		if (words[i].length>2){
			verseBible[osisRef]=verseBible[osisRef].split(" "+words[i]+" ").join(" FOUNDWORDSTART"+words[i]+"FOUNDWORDEND ");
			verseBible[osisRef]=verseBible[osisRef].split(" "+words[i].toLowerCase()+" ").join(" FOUNDWORDSTART"+words[i].toLowerCase()+"FOUNDWORDEND ");
		}
	}
	console.log(osisRef,verseBible[osisRef]);
}

//go through every word in the eastons
//if the word is found in the bible verse, surround the word with the tags
//if lower case version of the word is found in the bible verse, surround the word with the tags
//word must also be more than one character
let basename=filename.split(".json").join("").split("NoWordTags").join("");
console.log(verseBible);
fs.writeFileSync(basename+".json",JSON.stringify(verseBible),"utf8");












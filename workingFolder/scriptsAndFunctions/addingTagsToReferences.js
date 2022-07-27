const fs = require('fs');
let osisRefs=JSON.parse(fs.readFileSync("../arraysAndObjects/osisReferencesArray.json"));
let osisBC=JSON.parse(fs.readFileSync("../arraysAndObjects/bookChapterKeys.json"));
let eastons=JSON.parse(fs.readFileSync("../EastonsRelated/finalDatabaseNeedsVerseChapterTags.json"));
console.log(osisRefs);
console.log(osisBC);
console.log(eastons);

//loop through eastons entries

for (let i=0;i<eastons.length;i++){

	let entries=eastons[i]["entries"];
	//loop through entries
	for (j=0;j<entries.length;j++){
	
		let verseArray=entries[j]["verseReferences"].split(",");
		console.log(verseArray);


		for (let k=0;k<verseArray.length;k++){
			for (let l=0;l<osisRefs.length;l++){
				if (osisRefs[l]===verseArray[k]){
					verseArray[k]="VERSEREFSTART"+verseArray[k]+"VERSEREFEND";
				}
			}	
			eastons[i]["entries"][j]["verseReferences"]=verseArray.join(",");
		}
		console.log(eastons[i]["entries"][j]["verseReferences"]);


		for (let k=0;k<osisRefs.length;k++){
			entries[j]["dictText"]=entries[j]["dictText"].split("("+osisRefs[k]+")").join("(VERSEREFSTART"+osisRefs[k]+"VERSEREFEND)");
		}	
		
		for (let k=0;k<osisBC.length;k++){
			entries[j]["dictText"]=entries[j]["dictText"].split("("+osisBC[k]+")").join("(CHAPTERREFSTART"+osisBC[k]+"CHAPTERREFEND)");
		}
		
		eastons[i]["entries"][j]["dictText"]=entries[j]["dictText"];
		console.log(eastons[i]["entries"][j]["dictText"]);



	}


}

fs.writeFileSync("finalDatabase.json",JSON.stringify(eastons),"utf8");
fs.writeFileSync("finalDatabase.js","let eastons="+JSON.stringify(eastons)+";","utf8");
//make replacements in the references adding start end tags

//look through the text for references and chapters and add the start end tags


	//console.log("stringifying eastons");
	//let tempStrEastons=JSON.stringify(eastons);
//	for (let i=0;i<osisReferencesArray.length;i++){
//		let osisRef=osisReferencesArray[i];
//		console.log("replacing",osisRef);

	//	tempStrEastons = tempStrEastons.split("("+osisRef+")").join("(VERSEREFSTART"+osisRef+"VERSEREFEND");
//	}
	
//	eastons=JSON.parse(tempStrEastons);

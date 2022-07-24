function makeChapterBibleFromBible(jsonBible, osisReferencesArray, useExtras = true) {
    let thisChapterBible = {};
    let currentBook = "Gen";
    let currentChapter = "1";
    let wholeChapterText = "";
    //go through all verses
    for (let i = 0; i < osisReferencesArray.length; i++) {
        //get osisRef
        let osisRef = osisReferencesArray[i];
        //split osisRef into book chapter verse
        let info = osisRef.split(".");
        book = info[0];
        let chapter = info[1];
        let verse = info[2];
        let verseText = jsonBible[osisRef];
        if (verseText != undefined) {
            //alert("nothing at :" + osisRef);
            //verseText = "!!!!!!!!!!!!!!UNDEFINED!!!!!!!!!!!!!!!!!!!";
            //see if there is a change
            if ((book != currentBook) || (chapter != currentChapter)) {
                console.log("===book and chapter====");
                console.log(currentBook, currentChapter);
                console.log(wholeChapterText);

                thisChapterBible[currentBook + "." + currentChapter] = wholeChapterText;

                currentBook = book;
                currentChapter = chapter;

                wholeChapterText = "";

                if (useExtras) {
                    if (headingsLocations[osisRef] != undefined) { wholeChapterText += headingsLocations[osisRef] };
                    if (paragraphLocations[osisRef] != undefined) { wholeChapterText += paragraphLocations[osisRef] };
                }

                if (jsonBible[osisRef] != undefined) { wholeChapterText += "VERSESTART" + verse + "VERSEEND" + jsonBible[osisRef] };
                if (useExtras) {
                    if (paragraphEndLocations[osisRef] != undefined) { wholeChapterText += paragraphEndLocations[osisRef] };
                }



                //wholeChapterText = " [" + verse + "]" + verseText;
            } else { //no change just accumulate chapter
                if (useExtras) {
                    if (headingsLocations[osisRef] != undefined) { wholeChapterText += headingsLocations[osisRef] };
                    if (paragraphLocations[osisRef] != undefined) { wholeChapterText += paragraphLocations[osisRef] };
                }

                if (jsonBible[osisRef] != undefined) { wholeChapterText += "VERSESTART" + verse + "VERSEEND" + jsonBible[osisRef] };
                if (useExtras) {
                    if (paragraphEndLocations[osisRef] != undefined) { wholeChapterText += paragraphEndLocations[osisRef] };
                }

                //wholeChapterText += " [" + verse + "]" + verseText;

            }
        }


    }

    //got to the end but no change in chapter, write last chapter
    console.log("===book and chapter====");
    console.log(currentBook, currentChapter);
    console.log(wholeChapterText);

    thisChapterBible[currentBook + "." + currentChapter] = wholeChapterText;
    console.log(thisChapterBible);
    //saveStringToTextFile(JSON.stringify(thisChapterBible), "your" + "ChapterBible", ".json");
    return thisChapterBible;
}

let filename = process.argv[2];
let useExtras = process.argv[3];
if (useExtras === undefined) { //nothing entered
    useExtras = true;
} else if (useExtras === "false") { //false entered
    useExtras = false;
} else { //something entered other than false
    useExtras = true;
}
let paragraphLocations = {};
let paragraphEndLocations = {};
let headingsLocations = {};

if (filename != undefined) {
    const fs = require('fs');

    const osisReferencesArray = JSON.parse(fs.readFileSync('../arraysAndObjects/osisReferencesArray.json', 'utf8'));
    console.log(osisReferencesArray);
    //let bookIndexToName = { "1": "Gen", "2": "Exod", "3": "Lev", "4": "Num", "5": "Deut", "6": "Josh", "7": "Judg", "8": "Ruth", "9": "1Sam", "10": "2Sam", "11": "1Kgs", "12": "2Kgs", "13": "1Chr", "14": "2Chr", "15": "Ezra", "16": "Neh", "17": "Esth", "18": "Job", "19": "Ps", "20": "Prov", "21": "Eccl", "22": "Song", "23": "Isa", "24": "Jer", "25": "Lam", "26": "Ezek", "27": "Dan", "28": "Hos", "29": "Joel", "30": "Amos", "31": "Obad", "32": "Jonah", "33": "Mic", "34": "Nah", "35": "Hab", "36": "Zeph", "37": "Hag", "38": "Zech", "39": "Mal", "40": "Matt", "41": "Mark", "42": "Luke", "43": "John", "44": "Acts", "45": "Rom", "46": "1Cor", "47": "2Cor", "48": "Gal", "49": "Eph", "50": "Phil", "51": "Col", "52": "1Thess", "53": "2Thess", "54": "1Tim", "55": "2Tim", "56": "Titus", "57": "Phlm", "58": "Heb", "59": "Jas", "60": "1Pet", "61": "2Pet", "62": "1John", "63": "2John", "64": "3John", "65": "Jude", "66": "Rev" };
    paragraphLocations = JSON.parse(fs.readFileSync('../arraysAndObjects/paragraphLocations.json', 'utf8'));
    console.log(paragraphLocations);
    paragraphEndLocations = JSON.parse(fs.readFileSync('../arraysAndObjects/paragraphEndLocations.json', 'utf8'));
    console.log(paragraphEndLocations);
    headingsLocations = JSON.parse(fs.readFileSync('../arraysAndObjects/headingsLocations.json', 'utf8'));
    console.log(headingsLocations);
    const jsonBible = JSON.parse(fs.readFileSync(filename, 'utf8'));

    let theChapterBible = makeChapterBibleFromBible(jsonBible, osisReferencesArray, useExtras);

    console.log(theChapterBible);

    let baseName = filename.split(".json").join("");
    baseName = baseName.split("Bible").join("");
    let baseNameJS = "";
    //console.log(baseName);
    if (useExtras) {
        baseName = baseName + "ChapterBible.json";
        baseNameJS = baseName.split(".json").join(".js");
    } else {
        baseName = baseName + "ChapterBibleNoExtras.json";
        baseNameJS = baseName.split(".json").join(".js");
    }

    fs.writeFileSync(baseName, JSON.stringify(theChapterBible), "utf8");
    fs.writeFileSync(baseNameJS, "let theChapterBible = " + JSON.stringify(theChapterBible) + ";", "utf8");

} else {
    console.log("\nPlease use the filename (example KJVBible.json) as argument.\n");
    console.log("There is a second optional argument (true or false) to use extra headings and paragraph markers (default is true).");
    console.log("\nExample: makeChapterBibleNoExtras.js KJVBible.json (this will add extra headings/paragraphs by default).");
    console.log("Example: makeChapterBibleNoExtras.js KJVBible.json true (does same thing as above).");
    console.log("\nExample: makeChapterBibleNoExtras.js KJVBible.json false (omits extra headings/paragraphs).");
}
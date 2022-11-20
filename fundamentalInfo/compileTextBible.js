const fs = require('fs');


let filename = process.argv[2];

let format = process.argv[3];
if (format === undefined) {
    format = "html";
}
if (format != "html") {
    format = "text";
}

if (filename != undefined) {
    console.log(filename);
} else {
    console.log("You need to supply the filename of json Bible with osis style bcv as keys.");
    console.log("\nFor example, {'Gen.1.1':'text here','Gen.1.2.:'text etc'}");
    return;
}

let osisReferencesArray = JSON.parse(fs.readFileSync("osisReferencesArray.json"));

let bsbNested = JSON.parse(fs.readFileSync(filename));

let paragraphLocations = JSON.parse(fs.readFileSync("paragraphLocations.json"));
let headings = JSON.parse(fs.readFileSync("headings.json"));
let osisToFullName = JSON.parse(fs.readFileSync("osisToFullName.json"));

function makeBibleChapter(book, chapter, format = "html") {
    // bcv = bibleSelect.value;
    // let book = bcv.split(".")[0];
    // let chapter = bcv.split(".")[1];
    console.log(book, chapter);
    console.log(osisReferencesArray);
    let h2Name = osisToFullName[book];
    if (format === "text") {
        h2Name = osisToFullName[book].toUpperCase();
    }

    let chapterContents = "<h2>" + h2Name + " " + chapter.toUpperCase() + "</h2>";
    for (let i = 0; i < 200; i++) {
        if (bsbNested[book][chapter][i.toString()] !== undefined) {
            let currentBCV = book + "." + chapter + "." + i.toString();
            if (paragraphLocations.includes(currentBCV)) {
                chapterContents += "<br><br>";
            }
            if (headings[currentBCV] !== undefined) {
                let thisHeading = headings[currentBCV];
                if (format === "text") {
                    thisHeading = headings[currentBCV].toUpperCase()
                }
                chapterContents += "<h3>" + thisHeading + "</h3>";
            }
            chapterContents += "<sup>" + i.toString() + ".</sup>" + bsbNested[book][chapter][i.toString()];
        }
        //bibleContents.innerHTML = chapterContents;
    }

    if (format === "text") {
        chapterContents = chapterContents.split("<h2>").join("").split("</h2>").join("\n\n").split("<br>").join("\n").split("<sup>").join(" [").split(".</sup>").join("]").split("<h3>").join("").split("</h3>").join("\n\n").split("\n [").join("\n\t[");
    }

    return chapterContents;
}

function makeBibleBookChapterArray(osisReferencesArray) {
    let currentBook = "";
    let currentChapter = "";
    let bookChapterArray = [];
    for (let i = 0; i < osisReferencesArray.length; i++) {
        let book = osisReferencesArray[i].split(".")[0];
        let chapter = osisReferencesArray[i].split(".")[1];

        if (book !== currentBook) {
            currentBook = book;
            bookChapterArray.push[currentBook + ".1"];
            //str += "<option value='" + currentBook+".1"+ "'>" + currentBook+".1" + "</option>";
        }
        if (chapter != currentChapter) {
            currentChapter = chapter;
            bookChapterArray.push(currentBook + "." + currentChapter);
            //str += "<option value='" + currentBook+"."+currentChapter+ "'>" + currentBook+"."+currentChapter + "</option>";
        }
        //sstr += "<option value='" + osisReferencesArray[i] + "'>" + osisReferencesArray[i] + "</option>";
    }
    return bookChapterArray;
}

console.log(makeBibleChapter("Gen", "1"));

function compileTextBible(format){
    let bookChapterArray = makeBibleBookChapterArray(osisReferencesArray);
    console.log(bookChapterArray, bookChapterArray[bookChapterArray.length - 1]);
    
    let newBible = {};
    for (let i = 0; i < bookChapterArray.length; i++) {
        let book = bookChapterArray[i].split(".")[0];
        let chapter = bookChapterArray[i].split(".")[1];
        newBible[bookChapterArray[i]] = makeBibleChapter(book, chapter,format);
    }
    
    console.log(newBible);
    fs.writeFileSync("yourbible.json", JSON.stringify(newBible), "utf8");
    fs.writeFileSync("yourbible.js", "let jfb=" + JSON.stringify(newBible) + ";", "utf8");
}

compileTextBible(format);



const fs=require('fs');
let pulpitStr=fs.readFileSync("pulpit.json","utf8");

let nameToOsis={"Genesis":"Gen",
"Exodus":"Exod",
"Leviticus":"Lev",
"Numbers":"Num",
"Deuteronomy":"Deut",
"Joshua":"Josh",
"Judges":"Judg",
"Ruth":"Ruth",
"1Samuel":"1Sam",
"2Samuel":"2Sam",
"1Kings":"1Kgs",
"2Kings":"2Kgs",
"1Chronicles":"1Chr",
"2Chronicles":"2Chr",
"Ezra":"Ezra",
"Nehemiah":"Neh",
"Esther":"Esth",
"Job":"Job",
"Psalms":"Ps",
"Proverbs":"Prov",
"Ecclesiastes":"Eccl",
"Song of Solomon":"Song",
"Isaiah":"Isa",
"Jeremiah":"Jer",
"Lamentations":"Lam",
"Ezekiel":"Ezek",
"Daniel":"Dan",
"Hosea":"Hos",
"Joel":"Joel",
"Amos":"Amos",
"Obadiah":"Obad",
"Jonah":"Jonah",
"Micah":"Mic",
"Nahum":"Nah",
"Habakkuk":"Hab",
"Zephaniah":"Zeph",
"Haggai":"Hag",
"Zechariah":"Zech",
"Malachi":"Mal",
"Matthew":"Matt",
"Mark":"Mark",
"Luke":"Luke",
"John":"John",
"Acts":"Acts",
"Romans":"Rom",
"1Corinthians":"1Cor",
"2Corinthians":"2Cor",
"Galatians":"Gal",
"Ephesians":"Eph",
"Philippians":"Phil",
"Colossians":"Col",
"1Thessalonians":"1Thess",
"2Thessalonians":"2Thess",
"1Timothy":"1Tim",
"2Timothy":"2Tim",
"Titus":"Titus",
"Philemon":"Phlm",
"Hebrews":"Heb",
"James":"Jas",
"1Peter":"1Pet",
"2Peter":"2Pet",
"1John":"1John",
"2John":"2John",
"3John":"3John",
"Jude":"Jude",
"Revelation":"Rev"};



for (longname in nameToOsis){
    console.log("VERSETITLESTART"+longname,nameToOsis[longname]+".");

    pulpitStr=pulpitStr.split("VERSETITLESTART"+longname).join("VERSETITLESTART"+nameToOsis[longname]+".");    


}

for (let i=0;i<1000;i++){
    console.log(":"+i.toString()+"VERSETITLEEND","."+i.toString()+"VERSETITLEEND");
    pulpitStr=pulpitStr.split(":"+i.toString()+"VERSETITLEEND").join("."+i.toString()+"VERSETITLEEND");      
}

fs.writeFileSync("pulpitNew.json",pulpitStr,"utf8");
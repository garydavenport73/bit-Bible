const fs=require('fs');

let eastons=JSON.parse(fs.readFileSync("eastonsModified.json"));

console.log(eastons.length);

for (let i=0;i<eastons.length;i++){
    let entries=eastons[i]["entries"];

    //console.log(entries,entries.length);
    for (j=entries.length-1;j>=0;j--){
        //console.log(entries[j]);
        //console.log(entries[j]["dictText"]);
        if (entries[j]["dictText"]===""){
            console.log("found blank!!!!!!! at "+eastons[i]["word"]+"\n--------------------------------");

            console.log(entries);
            entries.splice(j,1);
            console.log(entries);
        }
    }
    //console.log(entries);
}

fs.writeFileSync("eastonsModifiedCleaned.json",JSON.stringify(eastons),"utf8");
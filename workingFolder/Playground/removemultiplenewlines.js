const fs=require('fs');
let pulpitStr=fs.readFileSync("pulpitNew.json","utf8");

for (let i=0;i<10;i++){
    console.log(i);
    pulpitStr=pulpitStr.split("NEWLINENEWLINE").join("NEWLINE");
}

fs.writeFileSync("pulpitNewer.json",pulpitStr,"utf8");
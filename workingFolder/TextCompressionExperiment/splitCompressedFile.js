const fs = require('fs');

contents=fs.readFileSync("ASVCompressed.csv","utf8");
let keys = contents.split("SPLITHERE")[0];
let compressed=contents.split("SPLITHERE")[1];

fs.writeFileSync("keys.json",keys);
fs.writeFileSync("compressedPortion.txt",compressed);


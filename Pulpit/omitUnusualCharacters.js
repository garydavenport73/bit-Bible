const fs = require('fs');

myString = fs.readFileSync("galations_single.json", "utf8");

console.log(myString);

function cleanString(input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

myString = cleanString(myString);

fs.writeFileSync("galations_single_cleaned.json", myString);
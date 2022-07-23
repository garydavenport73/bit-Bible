const fs=require('fs');
let testString=fs.readFileSync("AMP.csv","utf8");
let modifiedStr=testString;

let firstBlock="";
let keyArray=[];

for (i=1;i<9;i++){
	thisChar=String.fromCharCode(i);
	firstBlock+=thisChar;
	keyArray.push(thisChar);
	modifiedStr+=thisChar;
	}
for (i=14;i<32;i++){ //14 through 31 appear to not affect text, //unused  usefule characters are 1-8,11-31   ,127
	thisChar=String.fromCharCode(i);
	firstBlock+=thisChar;
	keyArray.push(thisChar);
		modifiedStr+=thisChar;
} //keys
//thisChar=String.fromCharCode(127);
//firstBlock+=thisChar;
//keyArray.push(thisChar);

console.log("length", firstBlock.length, firstBlock);
fs.writeFileSync("firstblock.txt",firstBlock,"utf8");
fs.writeFileSync("modifiedString.txt",modifiedStr,"utf8");

//let secondBlock="";
//for (i=32;i<59;i++){
//	thisChar=String.fromCharCode(i);
//	secondBlock+=thisChar;
//}
//console.log("length", secondBlock.length, secondBlock);
//fs.writeFileSync("secondblock.txt",secondBlock,"utf8");


for (let i=0;i<keyArray.length;i++){
	console.log(i,keyArray[i],testString.split(keyArray[i]).length);
	}
	




//			To Compress
//	 convert text to only ascii
//   if any of the keys are in words, replace with space
//   split text into words
//	 calculate replacement savings for each word
//	 order the words by greatest replacement savings
//	 pick the top 26 words, order by savings
//	 replace the words with the keys
//   make a string with commas and colons (can refine later)
//	 add to the new string as a header with a separator
//
//			To uncompress
//	separate header from content
//	split by commas, then read key:value pairs
//	replace the keys with the values in the content



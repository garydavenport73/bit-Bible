
//	 make keysArray
//			To Compress	
//	 convert text to only ascii								str to str		
//   if any of the keys are in words, replace with space	str to str 
//   split text into words									array
//	 get wordCounts											object
//	 convert wordCounts to array of word objects			array of objects
//	 calculate replacement savings for each word			
//	 and add that property to the array of word objects		array of objects
//	 order the words by greatest replacement savings		array of objects
//	 pick the top 26 words, order by savings				array of 26 words
//   
//	 replace the words with the keys
//   make a string with commas and colons (can refine later)
//	 add to the new string as a header with a separator
//
//			To uncompress
//	separate header from content
//	split by commas, then read key:value pairs
//	replace the keys with the values in the content

///////////////////////////////////////////////////////////////////
const fs=require('fs');
let str=fs.readFileSync("NASBChapterBible.json","utf8");
///////////////////////////////////////////////////////////////////
//	 make keysArray
let keysArray=[];
for (let i=1;i<9;i++){
	keysArray.push(String.fromCharCode(i));
	}
for (let i=14;i<32;i++){ //14 through 31 appear to not affect text, //unused  usefule characters are 1-8,11-31   ,127
	keysArray.push(String.fromCharCode(i));
}
/////trying to add extra keys
//for (let i=161;i<192;i++){ 
//	keysArray.push(String.fromCharCode(i));
//}
//////////////////////////
console.log(keysArray);
//			To Compress	
//	 convert text to only ascii								str to str	
function cleanString(str){
	let asciiString="";
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) < 128) {
			asciiString += str.charAt(i);
		}
		else {
			asciiString += " ";
			console.log(JSON.stringify(str.charAt(i)));
			console.log("weird character");
		}
	}
	return asciiString;
}

str = cleanString(str);
//cleanedString=str;
fs.writeFileSync("output.txt",str,"utf8")

//   if any of the keys are in words, replace with space	str to str
function omitKeysFromContent(keysArray,str){
	for (let i = 0; i < keysArray.length; i++){
		//if (str.split(keysArray[i])>1){
		//	console.log(keysArray[i]," ->found a character");
		//}
		str = str.split(keysArray[i]).join(" ");
	}
	return str;
}

str=omitKeysFromContent(keysArray,str);
//   split text into words									array
words = str.split(" ");
//	 get wordCounts											object

function getWordCount(words){
	let wordCount={};
	for (let i = 0;i<words.length;i++){
		//console.log(words[i]);
		if ( wordCount.hasOwnProperty(words[i])  ){
				wordCount[words[i]]+=1;
			}
		else {
			wordCount[words[i]]=1;
			}
	}
	return wordCount;
}

let wordCounts = getWordCount(words);

//	 convert wordCounts to array of word objects			array of objects
function makeWordObjectsArray(wordCounts){
	let wordObjects=[];
	for (word in wordCounts){
		let wordObject={};
		wordObject["word"]=word;
		wordObject["wordCount"]=wordCounts[word];
		if (wordCounts[word]>1000){ //limiting size
				wordObjects.push(wordObject);	
			}

	}
	return wordObjects;
}

let wordObjectsArray = makeWordObjectsArray(wordCounts); //array of word objects
console.log(wordObjectsArray);

function makeWordsWithTextSavings(wordObjects){
	for (let i=0;i<wordObjectsArray.length;i++){
		let word = wordObjectsArray[i]["word"];
		let count = wordObjectsArray[i]["wordCount"];
		// 					nubmer of text characters - replacement with 1 character - string in key
		let textSavings = word.length*count - 2*count - word.length - 6; //16 bit
		//let textSavings = word.length*count - count - word.length - 3; //8 bit
		wordObjectsArray[i]["textSavings"]=textSavings;
	}
	console.log(wordObjectsArray);
	return wordObjectsArray;
}

let wordObjectsWSavings = makeWordsWithTextSavings(wordObjectsArray);


//              sort array by field
function destructiveSort(arrayOfObjects, field, direction = 1) {
    //direction -1 is descending, otherwise ascending
    if (direction != -1) { direction = 1; }
    arrayOfObjects.sort((a, b) => {
        if (a[field] < b[field]) {
            return -1 * direction;
        }
        if (a[field] > b[field]) {
            return 1 * direction;
        }
        return 0;
    });
}

destructiveSort(wordObjectsWSavings, "textSavings", -1);


function makeWordsArray(wordObjectsWSavings,keysArray){
	let wordsArray=[];
	for (let i=0;i<keysArray.length;i++){
		console.log(wordObjectsWSavings[i]);
		wordsArray.push(wordObjectsWSavings[i]["word"]);
	}
return JSON.parse(JSON.stringify(wordsArray));	
}


let wordsArray = makeWordsArray(wordObjectsWSavings,keysArray);
console.log(keysArray);
console.log(wordsArray);

function compressString(str, keysArray,wordsArray){
	let header="";
	for (let i=0;i<wordsArray.length;i++){
		str=str.split(wordsArray[i]).join(keysArray[i]);
		header+=keysArray[i]+":"+wordsArray[i]+",";
	}
	header = header.slice(0,-1);// take off last comma
	str=header+"SPLITHERE"+str;
	return str;
}

let compressedString=compressString(str, keysArray, wordsArray)
fs.writeFileSync("NASBChapterBible.json.compressed.txt",compressedString,"utf8");

let checker=fs.readFileSync("NASBChapterBible.json.compressed.txt");
console.log(compressedString==checker);

function uncompressString(str){
	let arr=str.split("SPLITHERE");
	let header=arr[0];
	let content=arr[1];
	let keyCodeArray=header.split(",");
	//console.log(keyCodeArray);
	//let keys={};
	for (let i=0;i<keyCodeArray.length;i++){
		let key=keyCodeArray[i].split(":")[0];
		console.log(JSON.stringify(key));
		let word=keyCodeArray[i].split(":")[1];
		content=content.split(key).join(word);
	}
	//console.log(keys);

	return content;
}

let uncompressedString = uncompressString(compressedString);


fs.writeFileSync("checkcompress.json",compressedString,"utf8");
console.log(fs.readFileSync("checkcompress.json","utf8")==fs.readFileSync("output.txt","utf8"));



/*
for (let i=0;i<wordObjectsArray.length;i++){
	let wo=wordObjectsArray[i];
	if (wo["wordCount"]>2000){
		console.log(wo["word"], wo["wordCount"], wo["textSavings"]);
		}
	}
*/
	
//	 calculate replacement savings for each word			
//	 and add that property to the array of word objects		array of objects
//	 order the words by greatest replacement savings		array of objects
//	 pick the top 26 words, order by savings				array of 26 words
//   
//	 replace the words with the keys
//   make a string with commas and colons (can refine later)
//	 add to the new string as a header with a separator
//
//			To uncompress
//	separate header from content
//	split by commas, then read key:value pairs
//	replace the keys with the values in the content












/*
function removeDuplicateEntries(myArray){
	let newArray=[];
	for (let i = 0; i < myArray.length; i++){
		if (newArray.indexOf(myArray[i]) == -1){
			newArray.push(myArray[i]);
		}
	}
	return newArray;
}

words = removeDuplicateEntries(words);
*/

const fs = require('fs');
//let myString = fs.readFileSync("AMP.csv", "utf8");
//var wordCounts = { };
//var words = str.split(/\b/);

//for(var i = 0; i < words.length; i++)
//    wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;

//let mostCommon="";
//let maxCount=0;
//for (key in wordCounts){
//	if (wordCounts[key]>100){
//		console.log(key,wordCounts[key]);
//		if (wordCounts[key]>maxCount){
//			maxCount=wordCounts[key];
//			mostCommon=key;
//			}
//	}
//}

//console.log(maxCount,mostCommon);

//if word key is in object add one, otherwise make and add one
/*
let wordCounts = {}
let words = str.split(" ");
for (let i=0;i<words.length;i++){
	if (wordCounts.hasOwnProperty(words[i])){
		wordCounts[words[i]]+=1;
		}
	else{
		wordCounts[words[i]]=1;
		}
}

console.log(wordCounts);

let topWords=[];
for (key in wordCounts){
	if (wordCounts[key]>3000){
		console.log(key,wordCounts[key]);
		topWords.push(key);
		//if (wordCounts[key]>maxCount){
		//	maxCount=wordCounts[key];
		//	mostCommon=key;
		//	}
	}
}

*/

myString = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ull";
//needsReplaced = ["Lorem", "ipsum", "dolor", "consectetur", "sed"];
//replacer = ["1","2","3","4","5"];

//myString = myString+myString+myString+myString;

function replaceWords(str, needsReplaced, replacer){
	if (str.split("SPLITHERE").length>1){return str;}//cannot compress or already compressed;
	let keyValues={};
	let keyCode="";
	for (let i = 0; i < needsReplaced.length; i++){
		str=str.split(needsReplaced[i]).join(replacer[i]);
		keyValues[replacer[i]]=needsReplaced[i];
		keyCode+=replacer[i]+":"+needsReplaced[i]+",";
	}
	
	return keyCode.slice(0,-1)+"SPLITHERE"+str;
}


function replaceWordsObjectStyle(str,replacerObject){
		
	}
//let compressedString = replaceWords(myString,needsReplaced,replacer);
//console.log(compressedString);

function uncompress(str){
		let tempArray = str.split("SPLITHERE");
		let keyCodeString = tempArray[0];
		let compressedString = tempArray[1];
		let keyCodeArray=keyCodeString.split(",");
		let keyValues={};
		for (let i=0;i<keyCodeArray.length;i++){
			let key=keyCodeArray[i].split(":")[0];
			let word=keyCodeArray[i].split(":")[1];
			keyValues[key]=word;
			console.log(key);
			console.log(word);
			}
		
		let uncompressedString = compressedString;
		for (key in keyValues){
			uncompressedString = uncompressedString.split(key).join(keyValues[key]);
		}
		return uncompressedString;
}

/*
let uncompressedString = uncompress(compressedString);
console.log(uncompressedString);

console.log(myString==uncompressedString);
console.log(myString.length);
console.log(compressedString.length);
*/
function getWordsWorthCompressing(wordCount){
	let wordCountCopy = JSON.parse(JSON.stringify(wordCount));
	for (word in wordCountCopy){
		console.log(word,wordCountCopy[word]);
		
		let uncompressedTextLength = (word.length)*(wordCountCopy[word]);
		//uncompressed text -> compare the length of the word x its occurence  to
		console.log("uncompressedWordLength",uncompressedTextLength);
		
		let compressedTextLength = 6 + wordCountCopy[word];
		
		console.log("compressedTextLength",compressedTextLength);
		//compressed version -> 1xits occurenc + length of "x":"word", which is 6+length of word
		//if compressed text >= uncompressed text, remove the word from the object
		if (compressedTextLength >= uncompressedTextLength){
			
			delete wordCountCopy[word];
			console.log("deleted ", word);
		}
		
		//else, do nothing
		
	}
	return JSON.parse(JSON.stringify(wordCountCopy));
}


function getWordCount(words){
	let wordCount={};
	for (let i = 0;i<words.length;i++){
		console.log(words[i]);
		if ( wordCount.hasOwnProperty(words[i])  ){
				wordCount[words[i]]+=1;
			}
		else {
			wordCount[words[i]]=1;
			}
	}
	return wordCount;
}

function getReplacementKeys(str,numberOfKeysNeeded){
	str+=":,";//these are used in key building string 
	
	let count = 0;
	let i = 0;
	let replacementKeys=[];
	
	
	while (count < numberOfKeysNeeded){
		//check to see if charcode at i is in string
		
		let character = String.fromCharCode(i);
		
		while (JSON.stringify(character).length>3){
			i+=1;
			character = String.fromCharCode(i);
			console.log(JSON.stringify(character));
			
			}
		
		//console.log(JSON.stringify(character).length);
		
		console.log(character);
		//console.log(JSON.stringify(character));
		if (str.indexOf(character)!=-1){
				//if that character is in string, do nothing	
		}
		else {
			replacementKeys.push(character);
			count=count+1;
		}
		//if that character is no int sttring
		//push to replacment keys		
		//count is count +1
		i=i+1;
	}
	
	return replacementKeys;
}


let words = myString.split(" ");
let wordCount = getWordCount(words);
let wordsToCompress = getWordsWorthCompressing(wordCount);
let numberOfKeysNeeded = Object.keys(wordsToCompress).length
let replacementKeys = getReplacementKeys(myString,numberOfKeysNeeded);
console.log(replacementKeys);
console.log(Object.keys(wordsToCompress).length);
console.log(replacementKeys.length);

let wordsToReplace=[];
let i=0;
for (key in wordsToCompress){
	wordsToReplace[i]=key;
	i=i+1;
	}
	
console.log(wordsToReplace);


let newString=replaceWords(myString,wordsToReplace,replacementKeys);
console.log(newString);

fs.writeFileSync("testuncompressed.txt",myString,"utf8");
fs.writeFileSync("testcompress.txt",newString,"utf8");

newString = fs.readFileSync("testcompress.txt","utf8");

console.log(uncompress(newString));
console.log("checks out ok: ",uncompress(newString)==myString);

console.log("-------FINAL RESULTS-------");
console.log("String Length: ",myString.length);
console.log("Compre Length: ",newString.length);
console.log("% compression: ",100-parseInt(100*(newString.length/myString.length)));


//to compress
//-------------------------
//get the words
//get their frequency
//trim down words to only those which would benefit compression 
//find the number of words to replace -> this is the number of keys
//---get the keys to use				--> an array same length as the words
//---replace the words with the keys
//---addend the keys as a header to the file

//to uncompress
//-------------------------
//split the file into the key and content
//go through content and replace the key with its content

//for (i=0;i<128;i++){
	//console.log(String.fromCharCode(i));
	//}
	
//for (let i=0;i<replacementKeys.length;i++){
//	console.log(JSON.stringify(replacementKeys[i]),JSON.stringify(replacementKeys[i]).length);
//	}
	
	
	
	
//fs.writeFileSync("test.json",JSON.stringify(finalWordKeys));


const fs=require('fs');
/*let myBible = fs.readFileSync("AMP.csv", "utf8");

let block="";
for (i=0;i<256;i++){
	let thisChar=String.fromCharCode(i);
	block=block + thisChar;
	
	let tempArray=myBible.split(thisChar);
	console.log(i,thisChar, "found", tempArray.length-1, " times");
	//if (myBible.indexOf(thisChar)!=-1){
	//	console.log(thisChar, "found");
	//}
}
console.log(block);
fs.writeFileSync("256block.txt",block);

*/
//let buffer = new ArrayBuffer(16); // create a buffer of length 16

//let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

//console.log(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

//console.log(view.length); // 4, it stores that many integers
//console.log(view.byteLength); // 16, the size in bytes

// let's write a value
//view[0] = 123456;

// iterate over values
//for(let num of view) {
//  console.log(num); // 123456, then 0, 0, 0 (4 values total)
//}
console.log("8bit stuff");
let arr = new Uint8Array([0, 1, 2, 256]);
console.log( arr.length ); // 4, created binary array of the same length
console.log( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values
console.log( arr[2]);

for (let i=0;i<arr.length;i++){
	console.log(arr[i]);
	}
	
	
	
myString="Hello World";
//let my8BitArray=new Uint8Array();
let myArray=[];//new Uint8Array();
//for (let i =0; i<myString.length; i++){
for (let i =0; i<256; i++){
	myArray.push(i);
}

console.log(myArray);

let my8BitArray=new Uint8Array(myArray);

for (let i=0;i<my8BitArray.length;i++){
	console.log(my8BitArray[i]);
	}

fs.writeFileSync("binary.txt",new Buffer(my8BitArray));



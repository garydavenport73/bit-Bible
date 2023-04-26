let sentences = "Everyone knows that paper is made from trees. But when one looks at trees, one cannot imagine that something so soft and fragile as the paper is made is so hard and strong. Plant materials such as wood are made of fibres known as cellulose. It is the primary ingredient in paper making. Raw wood is first converted into pulp consisting of a mixture of Cellulose, lignin, water and some chemicals. The pulp can be made mechanically through grinders or through chemical processes. Short fibres are produced by mechanical grinding. The paper produced in this way is weak and is used to make newspapers, magazines and phonebooks.";



function splitParagraphIntoNWordGroups(n, paragraph) {
    let words = paragraph.split(" ");
    let length = words.length;
    let wordGroupLengthInt = parseInt(length / n);
    //let wordGroupLengthRemainder = length % n;
    let wordGroups = [];
    for (let i = 0; i < n; i++) {
        let str = "";
        for (let j = i * wordGroupLengthInt; j < (i + 1) * wordGroupLengthInt; j++) {
            str += words[j] + " ";
        }
        wordGroups.push(str);
    }
    let remainderString = "";
    for (let i = wordGroupLengthInt * n; i < words.length; i++) {
        remainderString += words[i] + " ";
    }
    remainderString = remainderString.substring(0, remainderString.length - 1);
    wordGroups[wordGroups.length - 1] = wordGroups[wordGroups.length - 1] + remainderString;
    return wordGroups;
}

let arr=splitParagraphIntoNWordGroups(12,sentences);
console.log(arr);
const canvas = document.getElementById('preview');
const fileInput = document.querySelector('input[type="file"');
const asciiImage = document.getElementById('ascii');
const fileLoadDiv = document.getElementById('file-load-div');
const buttonsDiv = document.getElementById('buttons-div');
const characterWidthInput = document.getElementById('character-width');
const pixelWidthInput = document.getElementById('pixel-width');
const saveTools = document.getElementById('save-tools');
let lastRequestedWidth = -1;
asciiImage.style.fontSize = "20px";

const context = canvas.getContext('2d');

const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const getFontRatio = () => {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};

const fontRatio = getFontRatio();

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        const grayScale = toGrayScale(r, g, b);
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

        grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

    return grayScales;
};

let MAXIMUM_WIDTH = 30;
const MAXIMUM_HEIGHT = 10000000000000;
let desiredImageWidth = 320;

function getFontWidth() {
    asciiImage.inner
}


const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(getFontRatio() * width);

    // if (height > MAXIMUM_HEIGHT) {
    //     const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
    //     return [reducedWidth, MAXIMUM_HEIGHT];
    // }

    if (width > MAXIMUM_WIDTH) {
        const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
        return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [rectifiedWidth, height];
};

function returnReducedHeight(imageWidth, imageHeight) {
    return Math.floor(imageHeight * (MAXIMUM_WIDTH / imageWidth) * (1.0 / fontRatio));
}
const image = new Image();
fileInput.onchange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
        image.onload = () => {


            //const [width, height] = clampDimensions(image.width, image.height);
            //width = MAXIMUM_WIDTH;
            //height = returnReducedHeight(image.width, image.height);
            //canvas.width = width;
            //canvas.height = height;

            //context.drawImage(image, 0, 0, width, height);
            //const grayScales = convertToGrayScales(context, width, height);

            fileLoadDiv.style.display = 'none';
            buttonsDiv.style.display = 'inherit';

            //drawAscii(grayScales, width);


            // setTimeout(() => {
            //     redraw(60);
            // }, 2000);
        }

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
};

//let grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
let grayRamp = '@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~i!lI;:,^. ';
//let grayRamp = '@%&M*akdqmOQCUXcuxjt|){[?_~>!I:"`\' ';

const rampLength = grayRamp.length;

const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);
        if ((index + 1) % width === 0) {
            nextChars += '\n';
        }

        return asciiImage + nextChars;
    }, '');

    asciiImage.textContent = ascii;
};



function draw() {
    //const [width, height] = clampDimensions(image.width, image.height);
    let width = characterWidthInput.value;

    if (width === lastRequestedWidth) {
        setSizeOfPre();
        //do nothing
    } else {
        MAXIMUM_WIDTH = width;
        let height = returnReducedHeight(image.width, image.height); //loaded in already
        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);
        let grayScales = convertToGrayScales(context, width, height);

        //fileInput.style.display = 'none';
        drawAscii(grayScales, width);
        setSizeOfPre();
        saveTools.style.display = "inherit";
        lastRequestedWidth = width;
    }


}

function setSizeOfPre() {
    asciiImage.style.fontSize = "20px";
    let floatFontSize = 20;
    //console.log(floatFontSize);
    let pixelWidth = document.getElementById('pixel-width').value;
    while (asciiImage.offsetWidth >= pixelWidth) {
        //floatFontSize = parseFloat(asciiImage.style.fontSize.slice(0, -2));
        //console.log(asciiImage.offsetWidth);
        //console.log(floatFontSize);

        floatFontSize = floatFontSize - 0.1;
        asciiImage.style.fontSize = floatFontSize + 'px';

        if (floatFontSize <= 0.5) {
            break;
        }
    }
    asciiLength = asciiImage.innerText.length;
    //asciiImage.style.fontSize = 30 - asciiImage.innerHTML.length / 6 + 'px';
    //elem.style.fontSize = 30 - elem.innerHTML.length / 6 + 'px';
    let result = document.getElementById("result");
    console.log(`Use font size ${floatFontSize}<br>for width of ${asciiImage.offsetWidth}px.<br><br>File size is:${asciiLength} bytes`);
    result.innerHTML = `Use font size ${floatFontSize}<br>for width of ${asciiImage.offsetWidth}px.<br><br>File size is:${asciiLength} bytes`;
}

function copyToClipBoard(str) {
    //https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied to Clipboard.');
    return (str);
}

function saveStringToTextFile(str1, basename = "myfile", fileType = ".txt") {
    let filename = basename + fileType;
    let blobVersionOfText = new Blob([str1], {
        type: "text/plain"
    });
    let urlToBlob = window.URL.createObjectURL(blobVersionOfText);
    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.download = filename;
    downloadLink.href = urlToBlob;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.parentElement.removeChild(downloadLink);
}

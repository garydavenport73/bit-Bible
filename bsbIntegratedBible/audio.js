let audioButton = document.getElementById("audio");
let playingAudio = false;
audioButton.addEventListener("click", playOrAbortSpeech);
if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
}

function playOrAbortSpeech() {
    if ('speechSynthesis' in window) {
        let myText = document.getElementById("bible-contents").innerText;
        myText = myText.replace(/\d\d?\d?\./g, " "); //remove verse numbers
        console.log("speech button pressed");
        msg.text = myText;
        if (playingAudio === false) {
            console.log("attempting to play");
            //currently not playing, user wants play
            window.speechSynthesis.speak(msg);
        }
        else {
            console.log("attempting to abort");
            //currently playing, stop audio
            window.speechSynthesis.cancel(msg)
        }
        playingAudio = !playingAudio;
    }
    else {
        alert("Speech synthesis is not available in this browser.");
    }
}
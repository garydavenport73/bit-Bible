let playingAudio = false;
let playButton = document.getElementById("play-audio");
playButton.addEventListener("click", play);
let pauseButton = document.getElementById("pause-audio");
pauseButton.addEventListener("click", pause);
let stopButton = document.getElementById("stop-audio");
stopButton.addEventListener("click", stop);

const synth = window.speechSynthesis;
let myPauseProperty = false;
let utterThis;
function stop() {
    warnNoSynth();
    myPauseProperty = false;
    synth.cancel(utterThis);
}
function play() {
    warnNoSynth();
    if ((myPauseProperty === true)&&(synth.speaking===true)) {//alredy started not ended
        //speech somewhere in the middle, and paused, needs resumed
        synth.resume();
        myPauseProperty=false;
    }
    else if (synth.speaking===false) {
        let myText = document.getElementById("bible-contents").innerText;
        myText = myText.replace(/\d\d?\d?\./g, " "); //remove verse numbers
        //not started or has ended, expects to start play
        utterThis = new SpeechSynthesisUtterance(myText);
        synth.speak(utterThis);
        myPauseProperty=false;
    }
}
function pause() {
    warnNoSynth();
    if ((myPauseProperty === true)&&(synth.speaking===true)) {
        //speech somewhere in middle of phrase and paused, user wants unpause
        synth.resume();
        myPauseProperty = false;
    }
    else if ((myPauseProperty === false)&&(synth.speaking===true)) {
        //speech somewhere in middle of phrase and unpaused, user wants pause
        synth.pause()
        myPauseProperty=true;
    }
}
function warnNoSynth(){
    if (!('speechSynthesis' in window)) {
        alert("Speech synthesis is not available in this browser.");
    }
}
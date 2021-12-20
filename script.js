const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

voices();

function voices() {
    for (let voice of synth.getVoices()) {
        //selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend", option); //inserting option tag beforeend of select tag
    }
}

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        //if the available device voice name is equal to the user sleected voice name
        // then set the speech voice to the user selected voice
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);  //speak the speech/utternance
}

synth.addEventListener("voiceschanged", voices)

speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) { //if an utterance/speech is not currently in the process of speaking
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            //if isSpeaking is true then it's value to false and resume the utterance
            // else change it's value to true and false the speech
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            //checking is utterance/speech in speaking process or not in every 100 ms
            // if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true
                    speechBtn.innerText = "Convert to Speech";
                }
            });
        } else {
            speechBtn.innerText = "Convert to Speech";

        }
    }
});

const textInput = document.getElementById('text-input');
const languageSelect = document.getElementById('language-select');
const voiceSelect = document.getElementById('voice-select');
const pitchRange = document.getElementById('pitch-range');
const speakButton = document.getElementById('speak-button');
const synth = window.speechSynthesis;

// Populate voice select options
function populateVoiceList() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

speakButton.addEventListener('click', () => {
    const text = textInput.value;
    const selectedLanguage = languageSelect.value;
    const selectedVoice = voiceSelect.value;
    const pitch = parseFloat(pitchRange.value);

    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        if (selectedVoice) {
            utterance.voice = synth.getVoices().find(voice => voice.name === selectedVoice);
        }
        utterance.pitch = pitch;
        synth.speak(utterance);
    }
});
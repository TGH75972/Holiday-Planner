function convertToSpeech() {
    const textInput = document.getElementById('textInput').value;
    const status = document.getElementById('status');
    
    if (textInput.trim() === "") {
        status.textContent = "Please enter some text.";
        return;
    }

    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(textInput);
        speechSynthesis.speak(speech);
        status.textContent = "Speaking...";
        
        speech.onend = () => {
            status.textContent = "Speech completed.";
        };
        
        speech.onerror = (event) => {
            status.textContent = "An error occurred during speech synthesis: " + event.error;
        };
    } else {
        status.textContent = "Sorry, your browser does not support speech synthesis.";
    }
}

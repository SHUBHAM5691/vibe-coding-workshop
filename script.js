const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const statusElement = document.getElementById('status');
const resultElement = document.getElementById('result');

let recognition;
let recognizing = false;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        recognizing = true;
        statusElement.textContent = 'Listening...';
        startButton.disabled = true;
        stopButton.disabled = false;
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        resultElement.innerHTML = finalTranscript + '<i style="color:#aaa;">' + interimTranscript + '</i>';
    };

    recognition.onerror = (event) => {
        statusElement.textContent = `Error occurred in recognition: ${event.error}`;
    };

    recognition.onend = () => {
        recognizing = false;
        statusElement.textContent = 'Click "Start Listening" and speak into your microphone.';
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    startButton.addEventListener('click', () => {
        if (recognizing) {
            recognition.stop();
            return;
        }
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        if (recognizing) {
            recognition.stop();
        }
    });
} else {
    statusElement.textContent = 'Speech recognition not supported in this browser.';
    startButton.disabled = true;
    stopButton.disabled = true;
}

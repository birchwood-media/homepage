// Change video and background
function changeContent(videoFile, backgroundImage) {
    const videoPlayer = document.getElementById('customVideo');
    const body = document.body;

    videoPlayer.src = 'Video/' + videoFile;
    videoPlayer.play();

    body.style.backgroundImage = `url(${backgroundImage})`;
}

// Detect mobile devices
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.style.cursor = 'auto';
} else {
    document.body.style.cursor = "url('images/cursor.ico'), auto";
}

// Quote rotation logic
document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const quoteFile = "quotes.txt";
    let quotes = [];
    let currentQuoteIndex = 0;

    fetch(quoteFile)
        .then(response => response.text())
        .then(data => {
            quotes = data.split("\n").filter(quote => quote.trim() !== "");
            startQuoteAnimation();
        })
        .catch(error => console.error("Error loading quotes:", error));

    function startQuoteAnimation() {
        if (quotes.length === 0) return;

        function showNextQuote() {
            quoteDisplay.classList.remove("fade-in");
            quoteDisplay.classList.add("fade-out");

            setTimeout(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                quoteDisplay.textContent = quotes[currentQuoteIndex];
                quoteDisplay.classList.remove("fade-out");
                quoteDisplay.classList.add("fade-in");
            }, 500);
        }

        setInterval(showNextQuote, 4000);
        quoteDisplay.textContent = quotes[currentQuoteIndex];
        quoteDisplay.classList.add("fade-in");
    }
});

// Video controls logic
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('customVideo');
    const playPauseBtn = document.getElementById('playPause');
    const muteUnmuteBtn = document.getElementById('muteUnmute');
    const rewindBtn = document.getElementById('rewind');

    // Set initial button states
    playPauseBtn.querySelector('img').src = 'images/pause.png'; // Show "Pause" icon initially
    muteUnmuteBtn.querySelector('img').src = video.muted ? 'images/mute.png' : 'images/sound_on.png';

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.querySelector('img').src = 'images/pause.png'; // Switch to "Pause" icon
        } else {
            video.pause();
            playPauseBtn.querySelector('img').src = 'images/play.png'; // Switch to "Play" icon
        }
    });

    // Mute/Unmute button functionality
    muteUnmuteBtn.addEventListener('click', () => {
        video.muted = !video.muted; // Toggle mute state
        muteUnmuteBtn.querySelector('img').src = video.muted ? 'images/mute.png' : 'images/sound_on.png'; // Update button icon
    });

    // Rewind button functionality
    rewindBtn.addEventListener('click', () => {
        video.currentTime = 0; // Reset to the beginning
        video.play();
    });
});

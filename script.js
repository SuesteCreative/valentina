// GIF Constants
const GIFS = {
    landing: '<div class="tenor-gif-embed" data-postid="251089554508706592" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/cupid-arrow-happy-valentines-day-valentines-day-happy-heart-day-gif-251089554508706592">Cupid Arrow Sticker</a></div>',
    certainty: '<div class="tenor-gif-embed" data-postid="23680990" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%"><a href="https://tenor.com/view/side-eye-dog-suspicious-look-suspicious-doubt-dog-doubt-gif-23680990">Side Eye Dog Suspicious Look GIF</a></div>',
    heartbreak: '<div class="tenor-gif-embed" data-postid="16778760554072111618" data-share-method="host" data-aspect-ratio="1.7" data-width="100%"><a href="https://tenor.com/view/prempdr-fc-mobile-fifa-gif-16778760554072111618">Prempdr Fc Mobile GIF</a></div>',
    notNow: '<div class="tenor-gif-embed" data-postid="9733783" data-share-method="host" data-aspect-ratio="0.821429" data-width="100%"><a href="https://tenor.com/view/not-now-nevvvvvverrrrlol-lol-gif-9733783">Not Now GIF</a></div>',
    crying: '<div class="tenor-gif-embed" data-postid="3785257530374072155" data-share-method="host" data-aspect-ratio="1.67114" data-width="100%"><a href="https://tenor.com/view/crying-bawling-gif-3785257530374072155">Crying Bawling GIF</a></div>',
    success: '<div class="tenor-gif-embed" data-postid="24787798" data-share-method="host" data-aspect-ratio="1.66667" data-width="100%"><a href="https://tenor.com/view/donald-duck-in-love-heart-beating-beautiful-crush-gif-24787798">Donald Duck In Love GIF</a></div>'
};

// State Variables
let noClicks = 0;
let simScale = 1;
let simEnabled = false;

// DOM Elements
const gifContainer = document.getElementById('gifContainer');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const toastEl = document.getElementById('toast');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const heartsContainer = document.getElementById('hearts-container');
const finalContent = document.getElementById('finalContent');
const replayBtn = document.getElementById('replayBtn');

// --- Helper Functions ---

/**
 * Updates the GIF in the container and triggers Tenor reload
 */
function setGif(htmlString) {
    gifContainer.innerHTML = htmlString;

    // Tenor Reload Logic
    const oldScript = document.querySelector('script[src*="tenor.com/embed.js"]');
    if (oldScript) {
        oldScript.remove();
    }

    const newScript = document.createElement('script');
    newScript.src = "https://tenor.com/embed.js";
    newScript.async = true;
    document.body.appendChild(newScript);
}

function setTitle(text) {
    titleEl.textContent = text;
}

function setSubtitle(text) {
    subtitleEl.textContent = text;
}

/**
 * Shows a temporary notification card
 */
function showToast(text, durationMs = 2000) {
    toastEl.textContent = text;
    toastEl.classList.remove('hidden');
    // Force reflow for animation
    void toastEl.offsetWidth;
    toastEl.classList.add('visible');

    setTimeout(() => {
        toastEl.classList.remove('visible');
        setTimeout(() => toastEl.classList.add('hidden'), 300);
    }, durationMs);
}

/**
 * Increases the Yes button size smoothly
 */
function updateYesScale() {
    simScale += 0.12;
    yesBtn.style.transform = `scale(${simScale})`;
}

/**
 * Spawns pulsating hearts for the background
 */
function spawnHearts() {
    const count = 30;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';

        if (!reducedMotion) {
            const duration = 1 + Math.random() * 2;
            heart.style.animation = `floatAndPulse ${duration}s ease-in-out infinite alternate`;
        }

        heartsContainer.appendChild(heart);
    }
}

/**
 * Final success state
 */
function enterFinalScreen() {
    // Hide buttons and clear styles
    yesBtn.classList.remove('fullscreen');
    yesBtn.classList.add('hidden');
    noBtn.classList.add('hidden');

    // Switch content
    setTitle("Obrigado minha valentina");
    setSubtitle("Agora anda tomar o pequeno-almoço");
    setGif(GIFS.success);

    // Show replay button
    finalContent.classList.remove('hidden');

    // Animate hearts
    spawnHearts();
}

// --- Event Listeners ---

noBtn.addEventListener('click', () => {
    noClicks++;
    simEnabled = true;
    updateYesScale();

    // Event sequence
    if (noClicks === 2) {
        setGif(GIFS.certainty);
        showToast("tens a certeza?");
    } else if (noClicks === 4) {
        setGif(GIFS.heartbreak);
        setTitle("Partes-me o coraçãozinho");
    } else if (noClicks === 6) {
        setGif(GIFS.notNow);
        setTitle("estás a ser malina!");
    } else if (noClicks === 8) {
        setGif(GIFS.crying);
        setSubtitle("tu já não gostas de mim");
    } else if (noClicks >= 10) {
        yesBtn.classList.add('fullscreen');
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        noBtn.classList.add('hidden');
    }
});

yesBtn.addEventListener('click', () => {
    if (!simEnabled) {
        // Subtle feedback for early click
        mainCard.classList.add('shake');
        setTimeout(() => mainCard.classList.remove('shake'), 250);
        return;
    }

    enterFinalScreen();
});

replayBtn.addEventListener('click', () => {
    window.location.reload();
});

// --- Initial Setup ---
setGif(GIFS.landing);

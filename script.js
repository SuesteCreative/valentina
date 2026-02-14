/**
 * Valentine's Day Interactive Script
 * - Handles GIF switching via Tenor embeds
 * - Manages button growth and event clicks
 * - Success state with heart animations
 */

const GIFS = {
    landing: '<div class="tenor-gif-embed" data-postid="251089554508706592" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/cupid-arrow-happy-valentines-day-valentines-day-happy-heart-day-gif-251089554508706592">Cupid Arrow Sticker</a></div>',
    certainty: '<div class="tenor-gif-embed" data-postid="23680990" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%"><a href="https://tenor.com/view/side-eye-dog-suspicious-look-suspicious-doubt-dog-doubt-gif-23680990">Side Eye Dog Suspicious Look GIF</a></div>',
    heartbreak: '<div class="tenor-gif-embed" data-postid="16778760554072111618" data-share-method="host" data-aspect-ratio="1.7" data-width="100%"><a href="https://tenor.com/view/prempdr-fc-mobile-fifa-gif-16778760554072111618">Prempdr Fc Mobile GIF</a></div>',
    notNow: '<div class="tenor-gif-embed" data-postid="9733783" data-share-method="host" data-aspect-ratio="0.821429" data-width="100%"><a href="https://tenor.com/view/not-now-nevvvvvverrrrlol-lol-gif-9733783">Not Now GIF</a></div>',
    crying: '<div class="tenor-gif-embed" data-postid="3785257530374072155" data-share-method="host" data-aspect-ratio="1.67114" data-width="100%"><a href="https://tenor.com/view/crying-bawling-gif-3785257530374072155">Crying Bawling GIF</a></div>',
    success: '<div class="tenor-gif-embed" data-postid="24787798" data-share-method="host" data-aspect-ratio="1.66667" data-width="100%"><a href="https://tenor.com/view/donald-duck-in-love-heart-beating-beautiful-crush-gif-24787798">Donald Duck In Love GIF</a></div>'
};

// State
let noClicks = 0;
let simEnabled = false;
let currentScale = 1;

// Elements
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

/**
 * Robustly refreshes Tenor embeds after dynamic injection
 */
function refreshTenor() {
    // We add a new script instance to trigger a re-scan of the DOM
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

function setGif(html) {
    gifContainer.innerHTML = html;
    refreshTenor();
}

function setTitle(text) {
    titleEl.textContent = text;
}

function setSubtitle(text) {
    subtitleEl.textContent = text;
}

function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.remove('hidden');
    // Force reflow
    void toastEl.offsetWidth;
    toastEl.classList.add('visible');

    setTimeout(() => {
        toastEl.classList.remove('visible');
        setTimeout(() => toastEl.classList.add('hidden'), 350);
    }, 2000);
}

function spawnHearts() {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = isReduced ? 10 : 35;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';

        if (!isReduced) {
            const moveTime = 0.5 + Math.random() * 1;
            const pulseTime = 0.3 + Math.random() * 0.4;
            heart.style.animation = `
                heartMove ${moveTime}s linear infinite alternate,
                heartPulse ${pulseTime}s ease-in-out infinite alternate
            `;
        }

        heartsContainer.appendChild(heart);
    }
}

// Event handlers
noBtn.addEventListener('click', () => {
    noClicks++;
    simEnabled = true;

    // Scaling Yes Button (affecting layout to push the "No" button down)
    const paddingBase = 1.1;
    const fontBase = 0.95;
    const growth = noClicks * 0.5;

    yesBtn.style.padding = `${paddingBase + growth}rem 1.5rem`;
    yesBtn.style.fontSize = `${fontBase + (noClicks * 0.25)}rem`;
    yesBtn.style.minHeight = `${4 + (noClicks * 2)}rem`; // Ensure height grows with text
    yesBtn.style.width = '100%'; // Occupy full width of container
    yesBtn.style.maxWidth = '100%';

    // Logic Tree
    if (noClicks === 2) {
        setGif(GIFS.certainty);
        showToast("tens a certeza?");
    } else if (noClicks === 4) {
        setGif(GIFS.heartbreak);
        setTitle("Partes-me o coraçãozinho");
    } else if (noClicks === 6) {
        setGif(GIFS.notNow);
        setTitle("já não gostas de mim");
        setSubtitle(""); // Clear subtitle if any
    } else if (noClicks === 8) {
        setGif(GIFS.crying);
        setTitle("estás a ser malina!");
        setSubtitle("");
    } else if (noClicks >= 10) {
        yesBtn.classList.add('fullscreen');
        noBtn.classList.add('hidden');
    }
});

yesBtn.addEventListener('click', () => {
    if (!simEnabled) {
        mainCard.classList.add('shake');
        setTimeout(() => mainCard.classList.remove('shake'), 250);
        return;
    }

    // Success State
    mainCard.style.opacity = '0';
    setTimeout(() => {
        // Clear initial state
        yesBtn.className = 'hidden';
        noBtn.classList.add('hidden');

        // Setup success view
        setTitle("Obrigado minha valentina");
        setSubtitle("Agora anda tomar o pequeno-almoço");
        setGif(GIFS.success);

        finalContent.classList.remove('hidden');
        mainCard.style.opacity = '1';

        spawnHearts();
    }, 400);
});

replayBtn.addEventListener('click', () => {
    window.location.reload();
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setGif(GIFS.landing);
});

let noClicks = 0;
let canClickYes = false;

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const gifDisplay = document.getElementById('gif-display');
const mainTitle = document.getElementById('main-title');
const initialState = document.getElementById('initial-state');
const successContent = document.getElementById('success-content');
const successGif = document.getElementById('success-gif');
const certaintyCard = document.getElementById('certainty-card');
const heartsContainer = document.getElementById('hearts-container');

const gifs = {
    initial: '<div class="tenor-gif-embed" data-postid="251089554508706592" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/cupid-arrow-happy-valentines-day-valentines-day-happy-heart-day-gif-251089554508706592">Cupid Arrow Sticker</a></div>',
    certainty: '<div class="tenor-gif-embed" data-postid="23680990" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%"><a href="https://tenor.com/view/side-eye-dog-suspicious-look-suspicious-doubt-dog-doubt-gif-23680990">Side Eye Dog Suspicious Look GIF</a></div>',
    heartbreak: '<div class="tenor-gif-embed" data-postid="16778760554072111618" data-share-method="host" data-aspect-ratio="1.7" data-width="100%"><a href="https://tenor.com/view/prempdr-fc-mobile-fifa-gif-16778760554072111618">Prempdr Fc Mobile GIF</a></div>',
    mean: '<div class="tenor-gif-embed" data-postid="9733783" data-share-method="host" data-aspect-ratio="0.821429" data-width="100%"><a href="https://tenor.com/view/not-now-nevvvvvverrrrlol-lol-gif-9733783">Not Now GIF</a></div>',
    crying: '<div class="tenor-gif-embed" data-postid="3785257530374072155" data-share-method="host" data-aspect-ratio="1.67114" data-width="100%"><a href="https://tenor.com/view/crying-bawling-gif-3785257530374072155">Crying Bawling GIF</a></div>',
    success: '<div class="tenor-gif-embed" data-postid="24787798" data-share-method="host" data-aspect-ratio="1.66667" data-width="100%"><a href="https://tenor.com/view/donald-duck-in-love-heart-beating-beautiful-crush-gif-24787798">Donald Duck In Love GIF</a></div>'
};

function updateGif(container, html) {
    container.innerHTML = html;
    // Force reload Tenor script to process new embed
    const oldScript = document.querySelector('script[src*="tenor.com/embed.js"]');
    if (oldScript) oldScript.remove();
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

// Ensure the first GIF is loaded correctly
updateGif(gifDisplay, gifs.initial);

btnNo.addEventListener('click', () => {
    noClicks++;
    canClickYes = true;

    // Increase YES button size
    const currentScale = 1 + (noClicks * 0.5);
    btnYes.style.transform = `scale(${currentScale})`;

    if (noClicks === 2) {
        updateGif(gifDisplay, gifs.certainty);
        certaintyCard.classList.remove('hidden');
        setTimeout(() => certaintyCard.classList.add('hidden'), 2000);
    } else if (noClicks === 4) {
        updateGif(gifDisplay, gifs.heartbreak);
        mainTitle.innerText = "Partes-me o coraçãozinho";
    } else if (noClicks === 6) {
        updateGif(gifDisplay, gifs.mean);
        mainTitle.innerText = "estás a ser malina!";
    } else if (noClicks === 8) {
        updateGif(gifDisplay, gifs.crying);
        mainTitle.innerText = "tu já não gostas de mim";
    } else if (noClicks >= 10) {
        // Full screen cover
        btnYes.style.position = 'fixed';
        btnYes.style.top = '0';
        btnYes.style.left = '0';
        btnYes.style.width = '100vw';
        btnYes.style.height = '100vh';
        btnYes.style.zIndex = '9999';
        btnYes.style.borderRadius = '0';
        btnYes.style.fontSize = '4rem';
        btnYes.style.display = 'flex';
        btnYes.style.alignItems = 'center';
        btnYes.style.justifyContent = 'center';
        btnNo.style.display = 'none';
    }
});

btnYes.addEventListener('click', () => {
    if (!canClickYes) return;

    // Transition to success state
    initialState.style.display = 'none';
    successContent.classList.remove('hidden');

    // Position fixed cleanup
    btnYes.style.display = 'none';

    // Inject Success GIF (Donald Duck) only now
    updateGif(successGif, gifs.success);

    startHeartRain();
});

document.getElementById('btn-restart').addEventListener('click', () => {
    window.location.reload();
});

function startHeartRain() {
    for (let i = 0; i < 40; i++) {
        setTimeout(createHeart, i * 150);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    heart.style.left = startX + 'vw';
    heart.style.top = startY + 'vh';

    // Fast side-to-side and pulsating as requested
    const moveDuration = 0.4 + Math.random() * 0.6;
    const pulseDuration = 0.3 + Math.random() * 0.3;

    heart.style.animation = `
        heartMove ${moveDuration}s ease-in-out infinite alternate,
        heartPulse ${pulseDuration}s ease-in-out infinite alternate
    `;

    heartsContainer.appendChild(heart);
}

// Initial state for hearts (defined in CSS animations)
const style = document.createElement('style');
style.textContent = `
    @keyframes heartMove {
        from { transform: translateX(-15vw); }
        to { transform: translateX(15vw); }
    }
    @keyframes heartPulse {
        from { transform: scale(0.8); opacity: 0.3; }
        to { transform: scale(1.4); opacity: 0.7; }
    }
`;
document.head.appendChild(style);

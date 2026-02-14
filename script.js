let noClicks = 0;
let canClickYes = false;

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const gifDisplay = document.getElementById('gif-display');
const mainTitle = document.getElementById('main-title');
const mainSubtitle = document.getElementById('main-subtitle');
const mainContent = document.getElementById('main-content');
const successContent = document.getElementById('success-content');
const buttonGroup = document.getElementById('button-group');
const certaintyCard = document.getElementById('certainty-card');
const heartsContainer = document.getElementById('hearts-container');

// GIF Snippets from User
const gifs = {
    initial: '<div class="tenor-gif-embed" data-postid="251089554508706592" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/cupid-arrow-happy-valentines-day-valentines-day-happy-heart-day-gif-251089554508706592">Cupid Arrow Sticker</a></div>',
    certainty: '<div class="tenor-gif-embed" data-postid="23680990" data-share-method="host" data-aspect-ratio="1.33891" data-width="100%"><a href="https://tenor.com/view/side-eye-dog-suspicious-look-suspicious-doubt-dog-doubt-gif-23680990">Side Eye Dog Suspicious Look GIF</a></div>',
    heartbreak: '<div class="tenor-gif-embed" data-postid="16778760554072111618" data-share-method="host" data-aspect-ratio="1.7" data-width="100%"><a href="https://tenor.com/view/prempdr-fc-mobile-fifa-gif-16778760554072111618">Prempdr Fc Mobile GIF</a></div>',
    mean: '<div class="tenor-gif-embed" data-postid="9733783" data-share-method="host" data-aspect-ratio="0.821429" data-width="100%"><a href="https://tenor.com/view/not-now-nevvvvvverrrrlol-lol-gif-9733783">Not Now GIF</a></div>',
    crying: '<div class="tenor-gif-embed" data-postid="3785257530374072155" data-share-method="host" data-aspect-ratio="1.67114" data-width="100%"><a href="https://tenor.com/view/crying-bawling-gif-3785257530374072155">Crying Bawling GIF</a></div>',
    success: '<div class="tenor-gif-embed" data-postid="24787798" data-share-method="host" data-aspect-ratio="1.66667" data-width="100%"><a href="https://tenor.com/view/donald-duck-in-love-heart-beating-beautiful-crush-gif-24787798">Donald Duck In Love GIF</a></div>'
};

function updateGif(html) {
    gifDisplay.innerHTML = html;

    // Remove existing Tenor script if any
    const oldScript = document.querySelector('script[src*="tenor.com/embed.js"]');
    if (oldScript) {
        oldScript.remove();
    }

    // Re-inject Tenor script to process new content
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

btnNo.addEventListener('click', () => {
    noClicks++;
    canClickYes = true;

    // Increase YES button size
    const currentScale = 1 + (noClicks * 0.4); // Faster growth
    btnYes.style.transform = `scale(${currentScale})`;

    // Move "No" button slightly to keep layout clean or just let it adjust
    btnNo.style.transition = 'margin 0.3s ease';

    // Sequence events
    if (noClicks === 2) {
        updateGif(gifs.certainty);
        certaintyCard.classList.remove('hidden');
        setTimeout(() => {
            certaintyCard.classList.add('hidden');
        }, 2000);
    } else if (noClicks === 4) {
        updateGif(gifs.heartbreak);
        mainTitle.innerText = "Partes-me o coraçãozinho";
    } else if (noClicks === 6) {
        updateGif(gifs.mean);
        mainTitle.innerText = "estás a ser malina!";
    } else if (noClicks === 8) {
        updateGif(gifs.crying);
        mainTitle.innerText = "tu já não gostas de mim";
    } else if (noClicks >= 10) {
        // Yes button fills the screen
        btnYes.style.position = 'fixed';
        btnYes.style.top = '0';
        btnYes.style.left = '0';
        btnYes.style.width = '101vw';
        btnYes.style.height = '101vh';
        btnYes.style.zIndex = '999';
        btnYes.style.borderRadius = '0';
        btnYes.style.fontSize = '3rem';
        btnYes.style.display = 'flex';
        btnYes.style.alignItems = 'center';
        btnYes.style.justifyContent = 'center';
        btnNo.style.display = 'none';
    }
});

btnYes.addEventListener('click', () => {
    if (!canClickYes) {
        // Option: subtle shake or just ignore
        return;
    }

    // Success state
    mainTitle.style.display = 'none';
    buttonGroup.style.display = 'none';
    gifDisplay.style.display = 'none';

    // Clean up fixed positioning if it was the 10th click
    btnYes.style.display = 'none';

    successContent.classList.remove('success-hidden');
    successContent.classList.add('success-show');
    updateGif(gifs.success);

    startHeartRain();
});

document.getElementById('btn-restart').addEventListener('click', () => {
    window.location.reload();
});

function startHeartRain() {
    // Create many hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    // Random position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';

    // Randomize movement duration for fast effect
    const moveDuration = 0.5 + Math.random() * 1;
    const scaleDuration = 0.3 + Math.random() * 0.4;

    heart.style.animation = `
        heartFloat ${moveDuration}s linear infinite, 
        heartsPulsate ${scaleDuration}s ease-in-out infinite alternate
    `;

    heartsContainer.appendChild(heart);
}


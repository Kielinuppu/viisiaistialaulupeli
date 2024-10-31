const sounds = {
    'aani1': new Audio('aani1.mp3'),
    'aani2': new Audio('aani2.mp3'),
    'aani3': new Audio('aani3.mp3'),
    'aani4': new Audio('aani4.mp3'),
    'aani5': new Audio('aani5.mp3')
};

let currentPlayingSound = null;
let activeImage = null;

function playSound(sound, imageElement) {
    stopAllSounds();
    sounds[sound].play();
    currentPlayingSound = sound;
    fadeOtherImages(imageElement);
    enlargeImage(imageElement);
    
    sounds[sound].onended = function() {
        resetState();
    };
}

function stopAllSounds() {
    for (let key in sounds) {
        sounds[key].pause();
        sounds[key].currentTime = 0;
    }
    resetState();
}

function fadeOtherImages(exceptImage) {
    const allImages = document.querySelectorAll('.game-board img');
    allImages.forEach(img => {
        if (img !== exceptImage) {
            img.classList.add('faded');
        }
    });
}

function unfadeAllImages() {
    const allImages = document.querySelectorAll('.game-board img');
    allImages.forEach(img => {
        img.classList.remove('faded');
    });
}

function enlargeImage(imageElement) {
    imageElement.classList.add('active');
    activeImage = imageElement;
    document.body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.stop-button').classList.add('active');
}

function shrinkImage() {
    if (activeImage) {
        activeImage.classList.remove('active');
        activeImage = null;
    }
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.remove();
    }
    document.querySelector('.stop-button').classList.remove('active');
}

function resetState() {
    unfadeAllImages();
    shrinkImage();
    currentPlayingSound = null;
}

document.addEventListener('DOMContentLoaded', function() {
    const stopButton = document.querySelector('.stop-button');
    if (stopButton) {
        stopButton.addEventListener('click', stopAllSounds);
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('overlay')) {
            stopAllSounds();
        }
    });
});

// ==========================================
// PALLAVI & VISHAL - WEDDING INVITATION
// ==========================================

// 1. Scene navigation and progress indicators

const scenes = [...document.querySelectorAll(".scene")];
const dots = [...document.querySelectorAll(".progress-dot")];
const current = document.getElementById("currentScene");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.48) {
                const i = scenes.indexOf(entry.target);

                if (i >= 0) {
                    if (current) {
                        current.textContent = String(i + 1).padStart(2, "0");
                    }

                    dots.forEach((dot, index) => {
                        dot.classList.toggle("active", index === i);
                    });

                    entry.target.classList.add("in-view");
                }
            }
        });
    },
    {
        threshold: [0.48, 0.65]
    }
);

scenes.forEach(scene => observer.observe(scene));


// ==========================================
// 2. WEDDING MUSIC PLAYER
// ==========================================

// IMPORTANT:
// Keep song.mp3 in the same folder as index.html.

const sound = document.getElementById("soundToggle");
const song = document.getElementById("weddingSong");

let musicPlaying = false;

// Update music button text

function updateMusicButton() {
    if (!sound) return;

    if (musicPlaying) {
        sound.innerHTML = '♫ <span>Music on</span>';
        sound.setAttribute("aria-label", "Pause wedding music");
    } else {
        sound.innerHTML = '♫ <span>Music off</span>';
        sound.setAttribute("aria-label", "Play wedding music");
    }
}


// Play the actual MP3 file

async function playWeddingMusic() {
    if (!song) {
        console.error("Wedding audio element not found.");
        return;
    }

    try {
        // Set the correct audio file
        song.src = "./song.mp3";

        song.loop = true;
        song.volume = 0.7;

        // Play after visitor interaction
        await song.play();

        musicPlaying = true;
        updateMusicButton();

    } catch (error) {
        musicPlaying = false;
        updateMusicButton();

        console.error("Unable to play wedding music:", error);
    }
}


// Pause the wedding music

function pauseWeddingMusic() {
    if (!song) return;

    song.pause();

    musicPlaying = false;
    updateMusicButton();
}


// Music toggle button

if (sound && song) {

    updateMusicButton();

    sound.addEventListener("click", async () => {

        if (musicPlaying && !song.paused) {
            pauseWeddingMusic();
        } else {
            await playWeddingMusic();
        }

    });

    // Keep button status synchronized
    song.addEventListener("play", () => {
        musicPlaying = true;
        updateMusicButton();
    });

    song.addEventListener("pause", () => {
        musicPlaying = false;
        updateMusicButton();
    });

    song.addEventListener("error", () => {
        console.error(
            "Could not load song.mp3. Check that it exists beside index.html."
        );
    });
}


// ==========================================
// 3. SMOOTH PAGE NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});

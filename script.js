
// ==========================================
// PALLAVI & VISHAL - WEDDING INVITATION
// ==========================================


// 1. SCENE NAVIGATION AND PROGRESS INDICATORS

const scenes = [...document.querySelectorAll(".scene")];
const dots = [...document.querySelectorAll(".progress-dot")];

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting && entry.intersectionRatio > 0.48) {

        const index = scenes.indexOf(entry.target);

        if (index >= 0) {

          // Update active navigation dot
          dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });

          // Trigger scene reveal animation
          entry.target.classList.add("in-view");
        }
      }

    });
  },
  {
    threshold: [0.48, 0.65]
  }
);


// Observe all scenes
scenes.forEach(scene => {
  observer.observe(scene);
});


// 2. WEDDING MUSIC - AUTOMATIC PLAYBACK

const weddingSong = document.getElementById("weddingSong");

if (weddingSong) {

  weddingSong.loop = true;
  weddingSong.volume = 0.7;

  let musicStarted = false;

  const startMusic = async () => {

    if (musicStarted) return;

    try {

      await weddingSong.play();

      musicStarted = true;

      // Remove fallback listeners after successful playback
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("keydown", startMusic);
      document.removeEventListener("touchstart", startMusic);

    } catch (error) {

      // Autoplay may be blocked by the browser.
      // Music will retry on the visitor's first interaction.

    }

  };


  // Attempt autoplay when the website loads
  startMusic();


  // Fallback: start music on first visitor interaction
  document.addEventListener("pointerdown", startMusic);
  document.addEventListener("keydown", startMusic);
  document.addEventListener("touchstart", startMusic);

}


// 3. SMOOTH PAGE NAVIGATION

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


// ==========================================
// END OF WEDDING INVITATION SCRIPT
// ==========================================

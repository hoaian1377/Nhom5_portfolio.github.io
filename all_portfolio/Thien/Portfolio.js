// ==== NAVBAR SCROLL EFFECT ====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==== SMOOTH SCROLL ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ==== ANIMATION ON SCROLL ====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// ==== HOVER SOUND ( nhỏ gọn) ====
const buttons = document.querySelectorAll(".project-btn, .btn");
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7a1da7b7d1.mp3?filename=click-124467.mp3");
    audio.volume = 0.2;
    audio.play();
  });
});

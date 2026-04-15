const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".shot-card"));
const buttons = Array.from(document.querySelectorAll(".gallery-button"));
const counter = document.getElementById("gallery-counter");

let currentIndex = 0;

function renderSlide(index) {
  if (!track || slides.length === 0 || !counter) {
    return;
  }

  currentIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  counter.textContent = `${currentIndex + 1} / ${slides.length}`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentIndex);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    renderSlide(currentIndex + direction);
  });
});

let startX = 0;

track?.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
}, { passive: true });

track?.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX) < 40) {
    return;
  }

  renderSlide(currentIndex + (deltaX < 0 ? 1 : -1));
}, { passive: true });

renderSlide(0);

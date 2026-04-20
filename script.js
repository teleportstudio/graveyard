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

const copyEmailButton = document.querySelector("[data-copy-email]");
let copyToastTimer;

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.copyEmail;

  if (!email) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
  } catch (error) {
    const tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  copyEmailButton.classList.add("is-copied");
  window.clearTimeout(copyToastTimer);
  copyToastTimer = window.setTimeout(() => {
    copyEmailButton.classList.remove("is-copied");
  }, 1000);
});

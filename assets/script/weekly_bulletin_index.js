/* 다음 주 주보로 교체할 때 아래 파일명만 변경하세요. */
const bulletinImages = [
  "2026.0830.1.jpg",
  "2026.0830.2.jpg"
];

const viewer = document.getElementById("bulletinViewer");
const image = document.getElementById("bulletinImage");
const indicator = document.getElementById("pageIndicator");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = 0;
let touchStartX = 0;

function showPage(index) {
  currentIndex = (index + bulletinImages.length) % bulletinImages.length;
  image.classList.add("is-changing");

  window.setTimeout(() => {
    image.src = bulletinImages[currentIndex];
    image.alt = `주보 ${currentIndex + 1}페이지`;
    indicator.textContent = `${currentIndex + 1} / ${bulletinImages.length}`;
    image.classList.remove("is-changing");
  }, 120);
}

prevButton.addEventListener("click", () => showPage(currentIndex - 1));
nextButton.addEventListener("click", () => showPage(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPage(currentIndex - 1);
  if (event.key === "ArrowRight") showPage(currentIndex + 1);
});

viewer.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

viewer.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 45) return;
  showPage(distance > 0 ? currentIndex - 1 : currentIndex + 1);
}, { passive: true });

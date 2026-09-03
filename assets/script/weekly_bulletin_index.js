/* 다음 주 주보로 교체할 때 아래 파일명만 변경하세요. */
const bulletinImages = [
  "1-3.jpg",
  "2-1.jpg",
  "2-2.jpg",
  "2-3.jpg",
	"1-1.jpg",
  "1-2.jpg"
];

const viewer = document.getElementById("bulletinViewer");
const image = document.getElementById("bulletinImage");
const indicator = document.getElementById("pageIndicator");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = 0;
let imageScale = 1;
let touchStartX = 0;
let pinchStartDistance = 0;
let pinchStartScale = 1;

function applyImageScale() {
  image.style.setProperty("--image-scale", imageScale);
}

function resetImageScale() {
  imageScale = 1;
  applyImageScale();
}

function showPage(index) {
  currentIndex = (index + bulletinImages.length) % bulletinImages.length;
  image.classList.add("is-changing");

  window.setTimeout(() => {
    image.src = bulletinImages[currentIndex];
    image.alt = `주보 ${currentIndex + 1}페이지`;
    indicator.textContent = `${currentIndex + 1} / ${bulletinImages.length}`;
    resetImageScale();
    image.classList.remove("is-changing");
  }, 120);
}

function getTouchDistance(touches) {
  const deltaX = touches[0].clientX - touches[1].clientX;
  const deltaY = touches[0].clientY - touches[1].clientY;
  return Math.hypot(deltaX, deltaY);
}

prevButton.addEventListener("click", () => showPage(currentIndex - 1));
nextButton.addEventListener("click", () => showPage(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPage(currentIndex - 1);
  if (event.key === "ArrowRight") showPage(currentIndex + 1);
  if (event.key === "Escape") resetImageScale();
});

viewer.addEventListener("wheel", (event) => {
  event.preventDefault();
  imageScale += event.deltaY < 0 ? 0.15 : -0.15;
  imageScale = Math.min(4, Math.max(1, imageScale));
  applyImageScale();
}, { passive: false });

viewer.addEventListener("dblclick", resetImageScale);

viewer.addEventListener("touchstart", (event) => {
  if (event.touches.length === 2) {
    pinchStartDistance = getTouchDistance(event.touches);
    pinchStartScale = imageScale;
    return;
  }

  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

viewer.addEventListener("touchmove", (event) => {
  if (event.touches.length !== 2 || pinchStartDistance === 0) return;
  event.preventDefault();
  const ratio = getTouchDistance(event.touches) / pinchStartDistance;
  imageScale = Math.min(4, Math.max(1, pinchStartScale * ratio));
  applyImageScale();
}, { passive: false });

viewer.addEventListener("touchend", (event) => {
  if (pinchStartDistance !== 0) {
    pinchStartDistance = 0;
    return;
  }

  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 45) return;
  showPage(distance > 0 ? currentIndex - 1 : currentIndex + 1);
}, { passive: true });

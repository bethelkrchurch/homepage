(() => {
  "use strict";

  const posters = [
    { src: "./images/2026-fall-registration-1.png", alt: "한국학교 등록안내 포스터 1" },
    { src: "./images/2026-fall-registration-2.png", alt: "한국학교 등록안내 포스터 2" }
  ];
  const openButton = document.getElementById("registrationOpen");
  const viewer = document.getElementById("posterViewer");
  const stage = document.getElementById("posterStage");
  const count = document.getElementById("posterCount");
  const closeButton = document.getElementById("posterClose");
  let currentIndex = 0;
  let touchStartX = 0;

  if (!openButton || !viewer || !stage || !count || !closeButton) return;

  const show = (index) => {
    currentIndex = (index + posters.length) % posters.length;
    const poster = posters[currentIndex];
    stage.innerHTML = `<img src="${poster.src}" alt="${poster.alt}">`;
    count.textContent = `${currentIndex + 1} / ${posters.length}`;
  };

  const open = () => {
    show(0);
    viewer.hidden = false;
    document.body.classList.add("poster-viewer-open");
    closeButton.focus();
  };

  const close = () => {
    viewer.hidden = true;
    stage.innerHTML = "";
    document.body.classList.remove("poster-viewer-open");
    openButton.focus();
  };

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  document.getElementById("posterPrev").addEventListener("click", () => show(currentIndex - 1));
  document.getElementById("posterNext").addEventListener("click", () => show(currentIndex + 1));
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) close();
  });
  document.addEventListener("keydown", (event) => {
    if (viewer.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
  viewer.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  viewer.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) >= 45) show(distance > 0 ? currentIndex - 1 : currentIndex + 1);
  }, { passive: true });
})();

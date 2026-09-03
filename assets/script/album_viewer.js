(() => {
  "use strict";
  const query = new URLSearchParams(location.search), year = query.get("year") || "", album = query.get("album") || "";
  const list = document.getElementById("mediaList"), empty = document.getElementById("emptyState"), viewer = document.getElementById("mediaViewer"), stage = document.getElementById("viewerStage"), count = document.getElementById("viewerCount");
  const imagePattern = /\.(?:jpe?g|png|gif|webp|avif|bmp|svg)$/i, videoPattern = /\.(?:mp4|webm|ogv|mov|m4v|3gp|3g2|mkv|avi|mpe?g)$/i;
  const esc = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const mediaUrl = (path) => String(path).replace(/^\.\/album\//i, "./");
  const albumData = Array.isArray(window.BETHEL_ALBUM_LIST) ? window.BETHEL_ALBUM_LIST : [];
  const metadata = albumData.find((item) => {
    const match = String(item.folder || "").match(/^\.\/?([^/]+)\/([^/]+)\/?$/);
    return match && decodeURIComponent(match[1]) === year && decodeURIComponent(match[2]) === album;
  });
  const title = metadata?.title || "교회 앨범";
  let files = [], currentIndex = 0, touchStartX = 0;
  document.title = `${title} | 벧엘한인장로교회`;
  document.getElementById("albumTitle").textContent = title;
  document.getElementById("albumDate").textContent = metadata?.date || "PHOTO · VIDEO";
  document.getElementById("albumDescription").textContent = metadata?.description || "";
  document.querySelector(".back-link").href = `./index.html?year=${encodeURIComponent(year)}`;
  function show(index) { currentIndex = (index + files.length) % files.length; const file = files[currentIndex]; stage.innerHTML = file.type === "video" ? `<video src="${esc(mediaUrl(file.src))}" controls autoplay playsinline></video>` : `<img src="${esc(mediaUrl(file.src))}" alt="${esc(file.title)}">`; count.textContent = `${currentIndex + 1} / ${files.length}`; }
  function open(index) { show(index); viewer.hidden = false; document.body.classList.add("viewer-open"); document.getElementById("viewerClose").focus(); }
  function close() { viewer.hidden = true; stage.innerHTML = ""; document.body.classList.remove("viewer-open"); }
  function initialize() {
    const paths = Array.isArray(window.BETHEL_ALBUM_FILES) ? window.BETHEL_ALBUM_FILES : [];
    files = paths.filter((path) => { const m = String(path).match(/^\.\/album\/([^/]+)\/([^/]+)\/([^/]+)$/i); return m && decodeURIComponent(m[1]) === year && decodeURIComponent(m[2]) === album && (imagePattern.test(path) || videoPattern.test(path)); }).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((src) => ({ src: String(src), type: videoPattern.test(src) ? "video" : "image", title: decodeURIComponent(String(src).split("/").pop()).replace(/\.[^.]+$/, "") }));
    if (!files.length) { empty.hidden = false; empty.textContent = "이 앨범에는 표시할 사진이나 동영상이 없습니다."; return; }
    list.innerHTML = files.map((file, i) => `<button class="media-card" type="button" data-index="${i}" aria-label="${esc(file.title)} 보기">${file.type === "video" ? `<video src="${esc(mediaUrl(file.src))}" preload="metadata" muted playsinline></video><span class="play-icon" aria-hidden="true">▶</span>` : `<img src="${esc(mediaUrl(file.src))}" alt="${esc(file.title)}" loading="lazy">`}</button>`).join("");
    list.querySelectorAll(".media-card").forEach((card) => card.addEventListener("click", () => open(Number(card.dataset.index))));
  }
  if (!year || !album) { empty.hidden = false; empty.textContent = "앨범 주소가 올바르지 않습니다."; return; }
  const script = document.createElement("script"); script.src = `./${encodeURIComponent(year)}/album_files.js`; script.onload = initialize; script.onerror = () => { empty.hidden = false; empty.textContent = `${year} 그룹의 파일 목록을 찾을 수 없습니다.`; }; document.head.appendChild(script);
  document.getElementById("viewerClose").addEventListener("click", close); document.getElementById("viewerPrev").addEventListener("click", () => show(currentIndex - 1)); document.getElementById("viewerNext").addEventListener("click", () => show(currentIndex + 1));
  viewer.addEventListener("click", (e) => { if (e.target === viewer) close(); }); document.addEventListener("keydown", (e) => { if (viewer.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(currentIndex - 1); if (e.key === "ArrowRight") show(currentIndex + 1); });
  viewer.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true }); viewer.addEventListener("touchend", (e) => { const d = e.changedTouches[0].clientX - touchStartX; if (Math.abs(d) >= 45) show(d > 0 ? currentIndex - 1 : currentIndex + 1); }, { passive: true });
})();

(() => {
  "use strict";

  const list = document.getElementById("bibleStudyList");
  const studies = Array.isArray(window.BETHEL_BIBLE_STUDIES)
    ? window.BETHEL_BIBLE_STUDIES
    : [];

  if (!list) return;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  if (!studies.length) {
    list.innerHTML = '<p class="worship-time">등록된 성경공부가 없습니다.</p>';
    return;
  }

  list.innerHTML = studies.map((study) => {
    const details = Array.isArray(study.details) ? study.details : [];

    return `<section class="worship-card bible-study-card">
      <div>
        <div class="worship-type">${escapeHtml(study.type)}</div>
        <h2>${escapeHtml(study.title)}</h2>
      </div>
      <div class="worship-time">${details.map(escapeHtml).join("<br>")}</div>
    </section>`;
  }).join("");
})();

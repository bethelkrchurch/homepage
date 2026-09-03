(() => {
  "use strict";

  const groups = Array.isArray(window.BETHEL_ALBUM_YEARS)
    ? window.BETHEL_ALBUM_YEARS.map(String).filter((group, index, all) => group && all.indexOf(group) === index)
    : [];
  const albumData = Array.isArray(window.BETHEL_ALBUM_LIST) ? window.BETHEL_ALBUM_LIST : [];
  const list = document.getElementById("albumList");
  const empty = document.getElementById("emptyState");
  const groupList = document.getElementById("albumYearList");
  const imagePattern = /\.(?:jpe?g|png|gif|webp|avif|bmp|svg)$/i;
  const videoPattern = /\.(?:mp4|webm|ogv|mov|m4v|3gp|3g2|mkv|avi|mpe?g)$/i;
  const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const mediaUrl = (path) => String(path).replace(/^\.\/album\//i, "./");
  const requestedGroup = new URLSearchParams(location.search).get("year") || "";
  const selectedGroup = groups.includes(requestedGroup) ? requestedGroup : groups[0] || "";

  const showMessage = (text) => {
    list.innerHTML = "";
    empty.hidden = false;
    empty.textContent = text;
  };

  const albumParts = (folder) => {
    const match = String(folder).match(/^\.\/?([^/]+)\/([^/]+)\/?$/);
    return match ? { group: decodeURIComponent(match[1]), folder: decodeURIComponent(match[2]) } : null;
  };

  if (!groups.length) {
    showMessage("등록된 앨범 그룹이 없습니다.");
    return;
  }

  if (groups.length > 1) {
    groupList.hidden = false;
    groupList.innerHTML = groups.map((group) =>
      `<a class="album-year${group === selectedGroup ? " is-active" : ""}" href="?year=${encodeURIComponent(group)}">${escapeHtml(group)}</a>`
    ).join("");
  }

  const script = document.createElement("script");
  script.src = `./${encodeURIComponent(selectedGroup)}/album_files.js`;
  script.onerror = () => showMessage(`${selectedGroup} 그룹의 파일 목록을 찾을 수 없습니다.`);
  script.onload = () => {
    const paths = Array.isArray(window.BETHEL_ALBUM_FILES) ? window.BETHEL_ALBUM_FILES.map(String) : [];
    const filesByAlbum = new Map();

    paths.forEach((path) => {
      const match = path.match(/^\.\/album\/([^/]+)\/([^/]+)\/([^/]+)$/i);
      if (!match || decodeURIComponent(match[1]) !== selectedGroup) return;
      if (!imagePattern.test(match[3]) && !videoPattern.test(match[3])) return;
      const folder = decodeURIComponent(match[2]);
      if (!filesByAlbum.has(folder)) filesByAlbum.set(folder, []);
      filesByAlbum.get(folder).push(path);
    });

    const configuredAlbums = albumData.filter((album) => {
      const parts = albumParts(album.folder);
      return parts && parts.group === selectedGroup && filesByAlbum.has(parts.folder);
    });

    if (!configuredAlbums.length) {
      showMessage(`${selectedGroup} 그룹에 등록된 앨범이 없습니다.`);
      return;
    }

    empty.hidden = true;
    list.innerHTML = configuredAlbums.map((album) => {
      const parts = albumParts(album.folder);
      const files = filesByAlbum.get(parts.folder);
      const images = files.filter((path) => imagePattern.test(path));
      const configuredThumbnail = album.thumbnail
        ? `./album/${selectedGroup}/${parts.folder}/${String(album.thumbnail).split("/").pop()}`
        : "";
      const thumbnail = images.includes(configuredThumbnail)
        ? configuredThumbnail
        : images.find((path) => /(?:cover|thumbnail|thumb|poster)/i.test(path)) || images[0];
      const cover = thumbnail
        ? `<img src="${escapeHtml(mediaUrl(thumbnail))}" alt="${escapeHtml(album.title)} 대표 사진" loading="lazy">`
        : '<span class="audio-thumbnail"><span aria-hidden="true">▶</span><strong>VIDEO</strong></span>';

      return `<a class="album-card" href="./viewer.html?year=${encodeURIComponent(selectedGroup)}&album=${encodeURIComponent(parts.folder)}">
        <span class="album-cover">${cover}</span>
        <span class="album-card-copy">
          ${album.date ? `<small>${escapeHtml(album.date)}</small>` : ""}
          <strong>${escapeHtml(album.title)}</strong>
        </span>
      </a>`;
    }).join("");
  };
  document.head.appendChild(script);
})();

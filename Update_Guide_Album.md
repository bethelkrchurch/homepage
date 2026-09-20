
# 1. 새 앨범 추가

## 1-1. 새 앨범 폴더 만들기

새 앨범은 다음 위치에 만듭니다.

```text
\homepage\album\ThisYear
```

예:

```text
\homepage\album\ThisYear\2026-09-06-Sunday-Fellowship
```

폴더 이름은 다음 규칙을 권장합니다.

- 영문, 숫자, 하이픈 `-` 사용
- 날짜와 행사 이름을 함께 사용
- `/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|` 사용 금지
- 한번 공개한 폴더 이름은 가급적 변경하지 않음

권장 예:

```text
2026-09-06-Sunday-Fellowship
2026-09-13-Youth-Worship
2026-09-20-Korean-School
```

## 1-2. 사진과 영상 넣기

새 폴더 안에 사진과 영상을 복사합니다.

예:

```text
2026-09-06-Sunday-Fellowship
├── cover.jpg
├── 01.jpg
├── 02.jpg
├── 03.jpg
└── 04.mp4
```

권장 파일명:

```text
01.jpg
02.jpg
03.jpg
01.mp4
```

지원 이미지 형식:

```text
jpg, jpeg, png, gif, webp, avif, bmp, svg
```

지원 동영상 형식:

```text
mp4, webm, ogv, mov, m4v, 3gp, 3g2, mkv, avi, mpg, mpeg
```

동영상은 브라우저 호환성이 좋은 다음 형식을 권장합니다.

```text
MP4
영상: H.264
음성: AAC
```

## 1-3. 대표 이미지 준비

앨범 목록에 표시할 대표 이미지를 준비합니다.

권장 파일명:

```text
cover.jpg
```

또는:

```text
cover.png
```

대표 이미지도 새 앨범 폴더 안에 넣습니다.

## 1-4. 앨범 정보 등록

다음 파일을 엽니다.

```text
\homepage\album\album_data.js
```

`window.BETHEL_ALBUM_LIST = [` 바로 아래에 새 항목을 추가합니다.

```javascript
{
  folder: "./ThisYear/2026-09-06-Sunday-Fellowship",
  title: `주일 친교
(Sunday Fellowship)`.trim(),
  date: "09/06/2026",
  thumbnail: "cover.jpg",
  description: `주일예배 후 성도님들이 함께 친교를 나누었습니다.`.trim()
},
```

날짜 형식은 기존 앨범과 동일하게 사용합니다.

```text
월/일/연도
MM/DD/YYYY
```

`folder` 값은 실제 폴더 이름과 대소문자까지 정확히 일치해야 합니다.

## 1-5. 앨범 파일 목록 갱신

Git Bash에서 홈페이지 최상위 폴더로 이동합니다.

```bash
cd ./homepage
```

올해 앨범 목록을 다시 만듭니다.

```bash
bash generate_album_lists.sh ThisYear
```

정상적인 경우 다음과 비슷한 결과가 나옵니다.

```text
ThisYear: 25 media file(s)
Album lists created successfully.
```

이 명령으로 다음 파일이 자동 갱신됩니다.

```text
album/ThisYear/album_files.js
album/album_years.js
```

이 파일들은 직접 편집하지 않습니다.

---

# 2. 앨범 삭제

## 2-1. 삭제할 앨범 백업

삭제할 폴더를 먼저 다른 위치에 복사하거나 휴지통으로 이동합니다.

예:

```text
\homepage\album\ThisYear\삭제할-앨범
```

홈페이지와 Git에 정상 반영된 것을 확인하기 전까지는 영구 삭제하지 않는 것이 좋습니다.

## 2-2. 앨범 폴더 삭제

다음 위치에서 해당 앨범 폴더 전체를 삭제합니다.

```text
\homepage\album\ThisYear
```

다른 앨범 폴더를 함께 삭제하지 않도록 주의합니다.

## 2-3. 앨범 정보 삭제

다음 파일을 엽니다.

```text
\homepage\album\album_data.js
```

삭제한 앨범의 `{`부터 `}`까지 한 항목 전체를 삭제합니다.

예를 들어 다음 앨범을 삭제한다면:

```javascript
{
  folder: "./ThisYear/2026-09-06-Sunday-Fellowship",
  title: `주일 친교
(Sunday Fellowship)`.trim(),
  date: "09/06/2026",
  thumbnail: "cover.jpg",
  description: `주일예배 후 성도님들이 함께 친교를 나누었습니다.`.trim()
},
```

위 블록 전체를 삭제합니다.

삭제 후 항목 사이의 쉼표 때문에 문법 오류가 생기지 않았는지 확인합니다.

## 2-4. 목록 다시 만들기

Git Bash에서:

```bash
cd ./homepage
bash generate_album_lists.sh ThisYear
```

삭제된 파일이 `album/ThisYear/album_files.js`에서 자동으로 제거됩니다.

---

# 3. 기존 앨범에 새 파일 추가

## 3-1. 대상 앨범 폴더 열기

예:

```text
\homepage\album\ThisYear\2026-09-06-Sunday-Fellowship
```

## 3-2. 새 사진이나 영상 복사

기존 파일과 이름이 겹치지 않게 추가합니다.

예:

```text
05.jpg
06.jpg
05.mp4
```

기존 파일과 같은 이름으로 복사하면 원본이 덮어써질 수 있으므로 주의합니다.

## 3-3. 목록 갱신

Git Bash에서:

```bash
cd ./homepage
bash generate_album_lists.sh ThisYear
```

`album_data.js`는 앨범 자체의 제목이나 설명이 바뀌지 않았다면 수정할 필요가 없습니다.

---

# 4. 기존 앨범에서 파일 삭제

## 4-1. 삭제할 파일 확인

앨범 폴더를 열고 삭제할 사진이나 영상을 확인합니다.

바로 영구 삭제하지 말고 먼저 별도 백업 폴더나 휴지통으로 이동하는 것을 권장합니다.

## 4-2. 대표 이미지 확인

삭제하려는 파일이 `album_data.js`의 `thumbnail`로 지정된 파일인지 확인합니다.

예:

```javascript
thumbnail: "cover.jpg"
```

`cover.jpg`를 삭제하면 앨범 대표 이미지가 표시되지 않습니다.

대표 이미지를 변경하려면 새 이미지 파일을 넣고 `album_data.js`도 변경합니다.

```javascript
thumbnail: "01.jpg"
```

## 4-3. 파일 삭제 후 목록 갱신

Git Bash에서:

```bash
cd ./homepage
bash generate_album_lists.sh ThisYear
```

삭제된 파일은 자동 생성 목록에서 제거됩니다.

---

# 5. 홈페이지에서 결과 확인

파일을 직접 더블클릭하는 대신 로컬 웹 서버로 확인하는 것을 권장합니다.

Git Bash에서:

```bash
cd ./homepage
python -m http.server 8000
```

`python` 명령이 없다면:

```bash
python3 -m http.server 8000
```

브라우저에서 홈페이지 확인:

```text
http://localhost:8000/
```

앨범 확인:

```text
http://localhost:8000/album/
```

확인할 항목:

- 주일 말씀 제목과 성경 본문
- 주일 말씀 YouTube 링크
- 새 앨범이 목록에 표시되는지
- 대표 이미지가 표시되는지
- 앨범 사진과 영상이 모두 열리는지
- 삭제한 앨범이나 파일이 더 이상 표시되지 않는지
- 휴대폰 크기에서도 정상적으로 보이는지

확인이 끝나면 Git Bash에서 `Ctrl + C`를 눌러 서버를 종료합니다.

---

# 6. GitHub에 변경사항 올리기

먼저 변경 내용을 확인합니다.

```bash
cd ./homepage
git status
```

이번 작업과 관계없는 파일이 없는지 확인한 후 모든 추가·수정·삭제 내용을 등록합니다.

```bash
git add -A
```

등록된 변경 파일을 확인합니다.

```bash
git status
git diff --cached --stat
```

주일 말씀만 수정한 경우:

```bash
git commit -m "Update weekly Sunday message"
```

앨범을 추가한 경우:

```bash
git commit -m "Add weekly church album"
```

앨범과 주일 말씀을 함께 수정한 경우:

```bash
git commit -m "Update Sunday message and church album"
```

GitHub에 올립니다.

```bash
git push
```

---

# 매주 작업 요약

## 새 앨범을 추가할 때

1. `album/ThisYear`에 새 폴더 생성
2. 사진·영상·대표 이미지 복사
3. `album/album_data.js`에 앨범 정보 추가
4. `bash generate_album_lists.sh ThisYear`
5. 로컬 홈페이지에서 앨범 확인
6. `git add -A`
7. `git commit`
8. `git push`

## 기존 앨범에 사진이나 영상을 추가·삭제할 때

1. 해당 앨범 폴더에서 파일 추가 또는 삭제
2. 대표 이미지가 삭제되지 않았는지 확인
3. `bash generate_album_lists.sh ThisYear`
4. 로컬 홈페이지에서 확인
5. `git add -A`
6. `git commit`
7. `git push`

## 앨범 전체를 삭제할 때

1. 앨범 폴더 백업
2. 해당 앨범 폴더 삭제
3. `album/album_data.js`에서 해당 앨범 항목 삭제
4. `bash generate_album_lists.sh ThisYear`
5. 홈페이지에서 삭제 결과 확인
6. `git add -A`
7. `git commit`
8. `git push`
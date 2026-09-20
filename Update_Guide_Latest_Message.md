# 벧엘교회 홈페이지 주간 업데이트 가이드

## 기본 작업 폴더

모든 작업은 다음 폴더에서 진행합니다.

```text
\homepage
```

작업을 시작하기 전에 기존 파일을 별도 위치에 백업하거나 Git 상태를 확인합니다.

Git Bash 실행:

```bash
cd ./homepage
git status
```

변경 중인 다른 파일이 없는지 먼저 확인합니다.

---

# 1. 주일 말씀 업데이트

## 수정할 파일

```text
\homepage\assets\script\latest_message.js
```

파일을 VS Code나 메모장으로 엽니다.

## 수정할 내용

```javascript
window.latestSundayMessage = {
  title: "이번 주 설교 제목",
  scripture: "성경 본문",
  youtubeUrl: "YouTube 영상 주소"
};
```

예:

```javascript
window.latestSundayMessage = {
  title: "내 이웃이 누구니이까",
  scripture: "누가복음 10:25~37",
  youtubeUrl: "https://youtu.be/abcdefghijk"
};
```

## 주의사항

- 큰따옴표 `"`를 삭제하지 않습니다.
- 각 줄 끝의 쉼표 `,`를 유지합니다.
- 마지막 `youtubeUrl` 줄에는 쉼표를 넣지 않아도 됩니다.
- YouTube Studio의 편집 주소가 아니라 실제 영상 공유 주소를 넣습니다.
- 주소에 포함된 추가 추적 부분은 생략해도 됩니다.

권장 주소:

```text
https://youtu.be/영상ID
```

## 확인 방법

홈페이지의 `index.html`을 열고 다음 내용을 확인합니다.

- 설교 제목
- 성경 본문
- `주일 말씀 보기` 링크
- 링크를 눌렀을 때 올바른 YouTube 영상이 열리는지

변경 내용이 보이지 않으면 브라우저에서 `Ctrl + F5`를 누릅니다.


---

# 매주 작업 요약

## 주일 말씀만 변경할 때

1. `assets/script/latest_message.js` 수정
2. 홈페이지에서 제목·본문·YouTube 링크 확인
3. `git add -A`
4. `git commit`
5. `git push`
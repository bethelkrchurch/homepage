[폴더 구조]

album/<연도>/<앨범 이름>/ 아래에 사진과 영상 파일을 넣습니다.
예: album/2026/Sunday-EM-Worship/1.jpg

각 연도 폴더에는 generate_album_lists.sh가 album_files.js를 만듭니다.
album/album_years.js에는 화면에 표시할 연도가 최신순으로 기록됩니다.

[목록 만들기]

Git Bash에서 홈페이지 최상위 폴더로 이동합니다.

특정 연도만 갱신:
bash generate_album_lists.sh 2026

모든 연도 갱신:
bash generate_album_lists.sh --all

사진이나 영상을 추가·삭제한 뒤 해당 연도 목록을 다시 만듭니다.
생성된 album/<연도>/album_files.js와 album/album_years.js도 GitHub에 올립니다.

[로컬 확인]

홈페이지 최상위에서 다음 명령을 실행합니다.
python -m http.server 8000

브라우저에서 http://localhost:8000/album/ 을 엽니다.
파일을 직접 더블클릭하지 말고 로컬 웹 서버 주소로 확인합니다.

[지원 이미지]
jpg, jpeg, png, gif, webp, avif, bmp, svg

[지원 동영상]
mp4, webm, ogv, mov, m4v, 3gp, 3g2, mkv, avi, mpg, mpeg

브라우저 호환성을 위해 H.264 영상과 AAC 음성을 사용한 MP4를 권장합니다.

[기존 파일]

기존 album/generated_album_files.js, album/local_album_files.js 및 album/album_data.js는
새 연도별 구조에서는 사용하지 않으므로 전환 확인 후 삭제할 수 있습니다.

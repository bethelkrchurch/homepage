#!/usr/bin/env bash

set -eu
PATH="/usr/bin:/bin:$PATH"

SCRIPT_PATH=${BASH_SOURCE[0]}
case "$SCRIPT_PATH" in
  */*) SCRIPT_PARENT=${SCRIPT_PATH%/*} ;;
  *) SCRIPT_PARENT=. ;;
esac
SCRIPT_DIR=$(cd "$SCRIPT_PARENT" && pwd)
cd "$SCRIPT_DIR"

if [ ! -d "album" ]; then
  echo "Error: album directory was not found." >&2
  exit 1
fi

TARGET_GROUP=${1:---all}

is_media_file() {
  case "${1,,}" in
    *.jpg|*.jpeg|*.png|*.gif|*.webp|*.avif|*.bmp|*.svg|\
    *.mp4|*.webm|*.ogv|*.mov|*.m4v|*.3gp|*.3g2|*.mkv|*.avi|*.mpg|*.mpeg)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

write_group_list() {
  group=$1
  output="album/$group/album_files.js"
  temp="${output}.tmp"
  count=0

  printf '/* This is created by executing ./generate_album_lists.sh %s */\n' "$group" > "$temp"
  printf 'window.BETHEL_ALBUM_FILES = [\n' >> "$temp"

  while IFS= read -r -d '' file
  do
    if is_media_file "$file"; then
      escaped=$(printf '%s' "$file" | sed 's/\\/\\\\/g; s/"/\\"/g')
      printf '  "./%s",\n' "$escaped" >> "$temp"
      count=$((count + 1))
    fi
  done < <(find "album/$group" -mindepth 2 -maxdepth 2 -type f -print0 | sort -z -f)

  printf '];\n' >> "$temp"
  mv "$temp" "$output"
  printf '%s: %d media file(s)\n' "$group" "$count"
}

found_target=0
while IFS= read -r -d '' directory
do
  group=${directory#album/}
  case "$group" in
    ThisYear|PassedYears|[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])
      if [ "$TARGET_GROUP" = "--all" ] || [ "$TARGET_GROUP" = "$group" ]; then
        write_group_list "$group"
        found_target=1
      fi
      ;;
  esac
done < <(find album -mindepth 1 -maxdepth 1 -type d -print0 | sort -z -r)

if [ "$found_target" -eq 0 ]; then
  echo "Error: album group was not found: $TARGET_GROUP" >&2
  exit 1
fi

echo "Album lists created successfully."

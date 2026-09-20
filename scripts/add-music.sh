#!/usr/bin/env bash
# Mux a licensed music track onto the silent walkthrough videos.
#
# The originals in videos/ carry a track that YouTube's Content ID blocked.
# videos/silent/ holds the same footage with the audio removed (video stream
# copied, never re-encoded). This script adds a track you have the right to use.
#
# Usage:
#   scripts/add-music.sh path/to/track.mp3
#
# Output lands in videos/scored/. The track is looped if it is shorter than the
# clip and trimmed if longer. The 3-second fade-out is placed at whichever comes
# first: the end of the clip, or the end of the track. That matters because a clip
# longer than the track would otherwise restart the music at full volume near the
# end, which is far more noticeable than a few seconds of silence.

set -euo pipefail

TRACK="${1:-}"
if [ -z "$TRACK" ] || [ ! -f "$TRACK" ]; then
  echo "usage: scripts/add-music.sh path/to/track.mp3" >&2
  exit 1
fi

TRACK_DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TRACK")

mkdir -p videos/scored

for src in videos/silent/*.mp4; do
  name=$(basename "$src")
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  fade_start=$(awk -v d="$dur" -v t="$TRACK_DUR" 'BEGIN {
    clip_end = (d > 3 ? d - 3 : 0)
    track_end = (t > 3 ? t - 3 : 0)
    printf "%.2f", (clip_end < track_end ? clip_end : track_end)
  }')

  ffmpeg -y -loglevel error \
    -i "$src" \
    -stream_loop -1 -i "$TRACK" \
    -c:v copy \
    -c:a aac -b:a 128k \
    -af "afade=t=out:st=${fade_start}:d=3" \
    -shortest \
    "videos/scored/$name"

  echo "scored $name (${dur}s, fade from ${fade_start}s)"
done

echo
echo "Done. Files are in videos/scored/ — upload those to YouTube."

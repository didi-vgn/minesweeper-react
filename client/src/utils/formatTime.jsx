export function formatTime(time) {
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  return `${min}:${sec}`;
}

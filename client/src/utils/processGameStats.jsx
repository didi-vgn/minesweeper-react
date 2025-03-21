export function processStats(data) {
  const stats = {
    mode:
      data.bombs === 10
        ? "BEGGINER"
        : data.bombs === 40
        ? "INTERMEDIATE"
        : "EXPERT",
    time: formatTime(data.time),
    bbbv: data.bbbv,
    points: Number(
      (Math.round((data.bbbv / data.time) * 100) / 100).toFixed(2)
    ),
    board: data.board,
  };

  return stats;
}

function formatTime(time) {
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  return `${min}:${sec}`;
}

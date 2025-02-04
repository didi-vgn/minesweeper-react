export function processStats(data, user = null) {
  const stats = {
    userId: user ? user.id : null,
    mode:
      data.bombs === 10
        ? "BEGGINER"
        : data.bombs === 40
        ? "INTERMEDIATE"
        : "EXPERT",
    time: formatTime(data.time),
    bbbv: data.bbbv,
    points: Number(
      (Math.round((data.time / data.bbbv) * 100) / 100).toFixed(2)
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

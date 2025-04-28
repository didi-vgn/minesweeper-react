export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const posToKey = (x, y) => `${x}-${y}`;
export const keyToPos = (key) => {
  const [x, y] = key.split("-").map(Number);
  return { x, y };
};

export function shuffle(arr) {
  for (let k = arr.length - 1; k > 0; k--) {
    const rand = Math.floor(Math.random() * (k + 1));
    [arr[k], arr[rand]] = [arr[rand], arr[k]];
  }
}

export function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function random(x) {
  return Math.floor(Math.random() * x);
}

export function getNeighbors(pos, grid) {
  const neighbors = [];
  for (const [dx, dy] of directions) {
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
      neighbors.push({ x: nx, y: ny });
    }
  }
  return neighbors;
}

export function reconstructPath(cameFrom, target) {
  const path = [];
  let current = posToKey(target.x, target.y);

  while (current) {
    const { x, y } = keyToPos(current);
    path.push({ x, y });
    current = cameFrom.get(current);
  }
  return path;
}

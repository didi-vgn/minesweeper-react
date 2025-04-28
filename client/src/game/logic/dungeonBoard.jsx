import { Queue } from "../utils/queue";
import { addNumbers } from "./addNumbers";
import {
  directions,
  getNeighbors,
  manhattanDistance,
  posToKey,
  random,
  reconstructPath,
  shuffle,
} from "./mapGenHelpers";

const colors = ["pink", "blue", "green", "yellow", "white"];

export function generateDungeonBoard(depth, width, height) {
  const map = generateMap(width, height);
  const center = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  };
  const walkable = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if ((i === center.y && j === center.x) || map[i][j].value === -2)
        continue;
      walkable.push({ i, j });
    }
  }

  shuffle(walkable);
  const b = Math.floor(walkable.length * (0.06 + 0.02 * depth));
  const s = Math.floor(walkable.length * 0.007);
  const g = Math.floor(walkable.length * 0.02);
  const chance = Math.random();
  const h = chance < 0.15 ? 2 : chance < 0.45 ? 1 : 0;

  for (let w = 0; w < b + s + g + h; w++) {
    const { i, j } = walkable[w];
    if (w < b) {
      map[i][j].value = -1;
    } else if (w < b + s) {
      map[i][j].scanner = true;
    } else if (w < b + s + g) {
      map[i][j].gem = colors[random(colors.length)];
    } else {
      map[i][j].extraTime = true;
    }
  }
  const { x, y } = randomWalker(map, center, 200);
  map[y][x].portal = true;

  addNumbers(map);
  return map;
}

function randomWalker(map, start, steps) {
  const cameFrom = new Set();
  cameFrom.add(`${start.x}-${start.y}`);
  let pos = { ...start };

  const [dx, dy] = directions[random(4)];
  const firstMove = { x: pos.x + dx, y: pos.y + dy };
  if (map[firstMove.y][firstMove.x].value >= 0) {
    pos = firstMove;
    cameFrom.add(`${pos.x}-${pos.y}`);
  }

  for (let i = 1; i < steps; i++) {
    let bestMove = null;
    let bestDistance = -Infinity;

    for (const [dx, dy] of directions) {
      const nx = pos.x + dx;
      const ny = pos.y + dy;
      const key = `${nx}-${ny}`;

      if (
        nx < 0 ||
        ny < 0 ||
        ny >= map.length ||
        nx >= map[0].length ||
        map[ny][nx].value < 0 ||
        cameFrom.has(key)
      ) {
        continue;
      }

      const distance = manhattanDistance(nx, ny, start.x, start.y);

      if (distance > bestDistance || Math.random() < 0.25) {
        bestDistance = distance;
        bestMove = { x: nx, y: ny };
      }
    }

    if (!bestMove) break;

    pos = bestMove;
    cameFrom.add(`${pos.x}-${pos.y}`);
  }

  return pos;
}

const generateMap = (width, height) => {
  let map = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: -2,
    }))
  );
  const center = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  };
  map[center.y][center.x].value = 0;
  expandIsland(map, center, 300);

  const numIslands = random(2) + 2;
  const islands = [center];

  for (let i = 1; i <= numIslands; i++) {
    let pos;
    let attempts = 50;
    do {
      pos = { x: random(width), y: random(height) };
      attempts--;
    } while (
      attempts > 0 &&
      islands.some(
        (island) => manhattanDistance(island.x, island.y, pos.x, pos.y) < 20
      )
    );
    map[pos.y][pos.x].value = 0;
    let nearestIsland = islands[0];
    let minDist = manhattanDistance(
      nearestIsland.x,
      nearestIsland.y,
      pos.x,
      pos.y
    );

    for (let island of islands) {
      let dist = manhattanDistance(island.x, island.y, pos.x, pos.y);
      if (dist < minDist) {
        minDist = dist;
        nearestIsland = island;
      }
    }
    const pathToNearest = bfs(pos, nearestIsland, map);
    pathToNearest.forEach(({ x, y }) => (map[y][x].value = 0));

    islands.push(pos);
    expandIsland(map, pos, 100);
  }

  expandOutline(map);
  return map;
};

function bfs(start, target, map) {
  const queue = new Queue();
  queue.enqueue(start);
  const cameFrom = new Map();
  cameFrom.set(posToKey(start.x, start.y), null);

  while (queue.getLength() > 0) {
    const current = queue.dequeue();
    if (current.x === target.x && current.y === target.y) {
      return reconstructPath(cameFrom, target);
    }
    for (let neighbor of getNeighbors(current, map)) {
      const key = posToKey(neighbor.x, neighbor.y);
      if (!cameFrom.has(key)) {
        cameFrom.set(key, posToKey(current.x, current.y));
        queue.enqueue(neighbor);
      }
    }
  }
  return [];
}

function expandIsland(map, island, expansionSize) {
  const frontier = [island];
  const expanded = new Set([posToKey(island.x, island.y)]);

  while (expansionSize > 0 && frontier.length > 0) {
    const index = random(frontier.length);
    const selected = frontier[index];
    frontier[index] = frontier[frontier.length - 1];
    frontier.pop();
    let { x, y } = selected;

    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      if (
        nx < 0 ||
        ny < 0 ||
        ny >= map.length ||
        nx >= map[0].length ||
        map[ny][nx].value === 0 ||
        expanded.has(posToKey(nx, ny))
      ) {
        continue;
      }
      map[ny][nx].value = 0;
      expanded.add(posToKey(nx, ny));
      frontier.push({ x: nx, y: ny });
      expansionSize--;
    }
  }
}

function findWalkableOutline(map) {
  let outline = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x].value !== 0) {
        for (let [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            ny >= 0 &&
            ny < map.length &&
            nx < map[0].length &&
            map[ny][nx].value === 0
          ) {
            outline.push({ x, y });
            break;
          }
        }
      }
    }
  }
  return outline;
}

function expandOutline(map) {
  let outline = findWalkableOutline(map);

  for (let { x, y } of outline) {
    map[y][x].value = 0;
    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      if (nx >= 0 && ny >= 0 && ny < map.length && nx < map[0].length) {
        if (map[ny][nx].value !== 0) {
          map[ny][nx].value = 0;
        }
      }
    }
  }
}

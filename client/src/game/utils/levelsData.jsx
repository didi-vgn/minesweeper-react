export const adventureLevels = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const width = 26 + 4 * id;
  const bombs = Math.floor(width * 9 * (0.05 + id / 500));
  const gems = Math.floor(width * 9 * 0.02);
  const scanners = Math.floor(width * 9 * 0.01);

  return { id, width, bombs, gems, scanners };
});

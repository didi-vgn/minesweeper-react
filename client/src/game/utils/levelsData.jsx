export const adventureLevels = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const width = 26 + 4 * id;
  const tiles = width * 10;
  const bombs = Math.floor(tiles * (0.05 + id * 0.002));
  const gems = Math.floor(tiles * 0.02);
  const scanners = Math.floor(tiles * 0.007);

  return { id, width, bombs, gems, scanners };
});

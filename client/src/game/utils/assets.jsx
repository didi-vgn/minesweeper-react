export const gemColors = {
  blue: "/gem/gem_blue.png",
  golden: "/gem/gem_golden.png",
  green: "/gem/gem_green.png",
  pink: "/gem/gem_pink.png",
  rainbow: "/gem/gem_rainbow.png",
  white: "/gem/gem_white.png",
  yellow: "/gem/gem_yellow.png",
};

export const mapSkins = {
  cave: {
    cover: "/map/cave_cover.png",
    tile: "/map/cave_tile.png",
  },
  forest: {
    cover: "/map/forest_cover.png",
    tile: "/map/forest_tile.png",
  },
  snow: {
    cover: "/map/snow_cover.png",
    tile: "/map/snow_tile.png",
  },
};

export const playerSprites = {
  blue: "/player/player_sprite_blue.png",
  green: "/player/player_sprite_green.png",
  pink: "/player/player_sprite_pink.png",
  white: "/player/player_sprite_white.png",
  yellow: "/player/player_sprite_yellow.png",
};

export const icons = {
  blue: "/icon/icon_blue.png",
  green: "/icon/icon_green.png",
  pink: "/icon/icon_pink.png",
  white: "/icon/icon_white.png",
  yellow: "/icon/icon_yellow.png",
  snow: "/icon/icon_snow.png",
  forest: "/icon/icon_forest.png",
  cave: "/icon/icon_cave.png",
  random: "/icon/icon_random.png",
};

export const other = {
  bomb: "/other/bomb.png",
  cloud: "/other/cloud.png",
  gameOver: "/other/game_over.png",
  portal: "/other/portal.png",
  scanner: "/other/scanner.png",
  gameWin: "/other/game_win.png",
  hourglass: "/other/hourglass.png",
  hourglassIcon: "/other/icon_hourglass.png",
};

export const animation = {
  movement: [0, 128],
  explode: [128 * 2, 128 * 3],
  pickUpGolden: [128 * 4, 128 * 5, 128 * 6],
  pickUpGreen: [128 * 7, 128 * 8, 128 * 9],
  pickUpPink: [128 * 10, 128 * 11, 128 * 12],
  pickUpBlue: [128 * 13, 128 * 14, 128 * 15],
  pickUpYellow: [128 * 16, 128 * 17, 128 * 18],
  pickUpWhite: [128 * 19, 128 * 20, 128 * 21],
  pickUpScanner: [128 * 22, 128 * 23, 128 * 24],
};

export const colors = [
  "text-stone-900",
  "text-lime-600",
  "text-amber-400",
  "text-orange-500",
  "text-red-600",
  "text-pink-600",
  "text-fuchsia-600",
  "text-violet-500",
  "text-indigo-600",
];

export const audio = {
  music: {
    main: "/audio/audio_hero_Just-Ducky_SIPML_K-04-57-01.mp3",
  },
  collectGem: [
    "/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_007_38293.mp3",
    "/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_016_38302.mp3",
    "/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_018_38304.mp3",
  ],
  win: [
    "/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_010_38296.mp3",
  ],
  smoke: [
    "/audio/zapsplat_nature_fire_flames_blow_hard_very_short_002_90300.mp3",
  ],
  bomb: ["/audio/zapsplat_cartoon_slime_hit_009_89582.mp3"],
  click: [
    "/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_001_86611.mp3",
    "/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_002_86612.mp3",
    "/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_003_86613.mp3",
  ],
  snow: [
    "/audio/ice/zapsplat_nature_ice_chunk_drop_designed_005_92553.mp3",
    "/audio/ice/zapsplat_nature_ice_chunk_drop_designed_006_92554.mp3",
    "/audio/ice/zapsplat_nature_ice_chunk_drop_designed_004_92552.mp3",
  ],
  cave: [
    "/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_004_100577.mp3",
    "/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_005_100578.mp3",
    "/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_008_100581.mp3",
    "/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_006_100579.mp3",
  ],
  forest: [
    "/audio/leaves/zapsplat_impacts_rock_hit_dirt_dead_leaves_roll_003_100591.mp3",
    "/audio/leaves/zapsplat_impacts_rock_hit_dirt_dead_leaves_roll_004_100592.mp3",
    "/audio/leaves/zapsplat_impacts_ground_with_leaves_hit_thud_002_102653.mp3",
  ],
};

export const playSoundEffect = (action, volume) => {
  const soundSrc =
    audio[action][Math.floor(Math.random() * audio[action].length)];

  if (soundSrc) {
    const soundEffect = new Audio(soundSrc);
    soundEffect.volume = volume;
    soundEffect.play();
  }
};

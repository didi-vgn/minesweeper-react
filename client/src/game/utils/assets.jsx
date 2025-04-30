const BASE_PATH = import.meta.env.BASE_URL;

export const gemColors = {
  blue: `${BASE_PATH}/gem/gem_blue.png`,
  golden: `${BASE_PATH}/gem/gem_golden.png`,
  green: `${BASE_PATH}/gem/gem_green.png`,
  pink: `${BASE_PATH}/gem/gem_pink.png`,
  rainbow: `${BASE_PATH}/gem/gem_rainbow.png`,
  white: `${BASE_PATH}/gem/gem_white.png`,
  yellow: `${BASE_PATH}/gem/gem_yellow.png`,
};

export const mapSkins = {
  cave: {
    cover: `${BASE_PATH}/map/cave_cover.png`,
    tile: `${BASE_PATH}/map/cave_tile.png`,
  },
  forest: {
    cover: `${BASE_PATH}/map/forest_cover.png`,
    tile: `${BASE_PATH}/map/forest_tile.png`,
  },
  snow: {
    cover: `${BASE_PATH}/map/snow_cover.png`,
    tile: `${BASE_PATH}/map/snow_tile.png`,
  },
};

export const playerSprites = {
  blue: `${BASE_PATH}/player/player_sprite_blue.png`,
  green: `${BASE_PATH}/player/player_sprite_green.png`,
  pink: `${BASE_PATH}/player/player_sprite_pink.png`,
  white: `${BASE_PATH}/player/player_sprite_white.png`,
  yellow: `${BASE_PATH}/player/player_sprite_yellow.png`,
};

export const icons = {
  blue: `${BASE_PATH}/icon/icon_blue.png`,
  green: `${BASE_PATH}/icon/icon_green.png`,
  pink: `${BASE_PATH}/icon/icon_pink.png`,
  white: `${BASE_PATH}/icon/icon_white.png`,
  yellow: `${BASE_PATH}/icon/icon_yellow.png`,
  snow: `${BASE_PATH}/icon/icon_snow.png`,
  forest: `${BASE_PATH}/icon/icon_forest.png`,
  cave: `${BASE_PATH}/icon/icon_cave.png`,
  random: `${BASE_PATH}/icon/icon_random.png`,
};

export const other = {
  bomb: `${BASE_PATH}/other/bomb.png`,
  cloud: `${BASE_PATH}/other/cloud.png`,
  gameOver: `${BASE_PATH}/other/game_over.png`,
  portal: `${BASE_PATH}/other/portal.png`,
  scanner: `${BASE_PATH}/other/scanner.png`,
  gameWin: `${BASE_PATH}/other/game_win.png`,
  hourglass: `${BASE_PATH}/other/hourglass.png`,
  hourglassIcon: `${BASE_PATH}/other/icon_hourglass.png`,
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
  `text-stone-900`,
  `text-lime-600`,
  `text-amber-400`,
  `text-orange-500`,
  `text-red-600`,
  `text-pink-600`,
  `text-fuchsia-600`,
  `text-violet-500`,
  `text-indigo-600`,
];

export const audio = {
  music: {
    main: `${BASE_PATH}/audio/audio_hero_Just-Ducky_SIPML_K-04-57-01.mp3`,
  },
  collectGem: [
    `${BASE_PATH}/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_007_38293.mp3`,
    `${BASE_PATH}/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_016_38302.mp3`,
    `${BASE_PATH}/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_018_38304.mp3`,
  ],
  win: [
    `${BASE_PATH}/audio/collect/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_010_38296.mp3`,
  ],
  smoke: [
    `${BASE_PATH}/audio/zapsplat_nature_fire_flames_blow_hard_very_short_002_90300.mp3`,
  ],
  bomb: [`${BASE_PATH}/audio/zapsplat_cartoon_slime_hit_009_89582.mp3`],
  click: [
    `${BASE_PATH}/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_001_86611.mp3`,
    `${BASE_PATH}/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_002_86612.mp3`,
    `${BASE_PATH}/audio/click/zapsplat_cartoon_pop_mouth_mid_pitch_003_86613.mp3`,
  ],
  snow: [
    `${BASE_PATH}/audio/ice/zapsplat_nature_ice_chunk_drop_designed_005_92553.mp3`,
    `${BASE_PATH}/audio/ice/zapsplat_nature_ice_chunk_drop_designed_006_92554.mp3`,
    `${BASE_PATH}/audio/ice/zapsplat_nature_ice_chunk_drop_designed_004_92552.mp3`,
  ],
  cave: [
    `${BASE_PATH}/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_004_100577.mp3`,
    `${BASE_PATH}/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_005_100578.mp3`,
    `${BASE_PATH}/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_008_100581.mp3`,
    `${BASE_PATH}/audio/rock/zapsplat_impact_rock_med_small_drop_hit_rocks_ground_leaves_006_100579.mp3`,
  ],
  forest: [
    `${BASE_PATH}/audio/leaves/zapsplat_impacts_rock_hit_dirt_dead_leaves_roll_003_100591.mp3`,
    `${BASE_PATH}/audio/leaves/zapsplat_impacts_rock_hit_dirt_dead_leaves_roll_004_100592.mp3`,
    `${BASE_PATH}/audio/leaves/zapsplat_impacts_ground_with_leaves_hit_thud_002_102653.mp3`,
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

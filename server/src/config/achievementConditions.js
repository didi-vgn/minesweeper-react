exports.ACHIEVEMENT_CONDITIONS = {
  adventurer_1: (stats) => stats.levelsCompleted >= 5,
  adventurer_2: (stats) => stats.levelsCompleted >= 15,
  adventurer_3: (stats) => stats.levelsCompleted >= 30,
  adventurer_4: (stats) => stats.levelsCompleted >= 50,
  collector_1: (stats) => stats.totalGems >= 100,
  collector_2: (stats) => stats.totalGems >= 500,
  collector_3: (stats) => stats.totalGems >= 1000,
  collector_4: (stats) => stats.totalGems >= 2500,
  engineer_1: (stats) => stats.bombsScanned >= 50,
  engineer_2: (stats) => stats.bombsScanned >= 150,
  engineer_3: (stats) => stats.bombsScanned >= 300,
  engineer_4: (stats) => stats.bombsScanned >= 500,
  team_blue: (stats) => stats.blueGames >= 50,
  team_pink: (stats) => stats.pinkGames >= 50,
  team_green: (stats) => stats.greenGames >= 50,
  team_yellow: (stats) => stats.yellowGames >= 50,
  team_white: (stats) => stats.whiteGames >= 50,
  team_player: (stats) =>
    stats.blueGames >= 50 &&
    stats.pinkGames >= 50 &&
    stats.greenGames >= 50 &&
    stats.yellowGames >= 50 &&
    stats.whiteGames >= 50,
  perseverance: (stats) => stats.deaths >= 500,
  test: (stats) => stats.levelsCompleted >= 1,
  pacifist: (stats) => stats.noScanWins >= 20,
  portal_1: (stats) => stats.teleports >= 50,
  portal_2: (stats) => stats.teleports >= 150,
  portal_3: (stats) => stats.teleports >= 300,
  portal_4: (stats) => stats.teleports >= 500,
  deep_diver: (stats) => stats.bestDepth >= 10,
  time_1: (stats) => stats.extraTime >= 500,
  time_2: (stats) => stats.extraTime >= 1000,
  time_3: (stats) => stats.extraTime >= 2000,
  time_4: (stats) => stats.extraTime >= 3500,
  scout: (stats) => stats.mostGemsCollected >= 50,
};

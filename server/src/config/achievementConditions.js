export const ACHIEVEMENT_CONDITIONS = {
  adventurer_1: (stats) => stats.levelsCompleted >= 5,
  adventurer_2: (stats) => stats.levelsCompleted >= 15,
  adventurer_3: (stats) => stats.levelsCompleted >= 30,
  adventurer_4: (stats) => stats.levelsCompleted >= 50,
  collector_1: (stats) => stats.totalGems >= 50,
  collector_2: (stats) => stats.totalGems >= 150,
  collector_3: (stats) => stats.totalGems >= 500,
  collector_4: (stats) => stats.totalGems >= 1000,
  engineer_1: (stats) => stats.bombsScanned >= 15,
  engineer_2: (stats) => stats.bombsScanned >= 50,
  engineer_3: (stats) => stats.bombsScanned >= 150,
  engineer_4: (stats) => stats.bombsScanned >= 300,
  team_blue: (stats) => stats.blueGames >= 20,
  team_pink: (stats) => stats.pinkGames >= 20,
  team_green: (stats) => stats.greenGames >= 20,
  team_yellow: (stats) => stats.yellowGames >= 20,
  team_white: (stats) => stats.whiteGames >= 20,
  team_player: (stats) =>
    stats.blueGames >= 10 &&
    stats.pinkGames >= 10 &&
    stats.greenGames >= 10 &&
    stats.yellowGames >= 10 &&
    stats.whiteGames >= 10,
  perseverance: (stats) => stats.deaths >= 500,
  test: (stats) => stats.levelsCompleted >= 1,
};

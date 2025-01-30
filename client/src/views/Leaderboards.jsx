import Row from "../components/Row";

export default function Leaderboards() {
  const games = [
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
    {
      nickname: "didi",
      difficulty: "intermediate",
      time: "23:45",
      "3BV": 20,
      score: 3.16,
    },
  ];

  return (
    <div className='w-9/10 m-10'>
      <Row
        key='head'
        nickname='Nickname'
        gameMode='Game Mode'
        time='Time'
        bbbv='3BV'
        score='Score'
      ></Row>
      {games.map((game, index) => (
        <Row
          key={index}
          nickname={game.nickname}
          gameMode={game.difficulty}
          time={game.time}
          bbbv={game["3BV"]}
          score={game.score}
        ></Row>
      ))}
    </div>
  );
}

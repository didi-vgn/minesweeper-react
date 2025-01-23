export default function Leaderboards() {
  const scores = [
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
    <div>
      <h3>Leaderboards</h3>
      <div className='row'>
        <div>Nickname</div>
        <div>Difficulty</div>
        <div>Time</div>
        <div>3BV</div>
        <div>Score</div>
      </div>
      {scores.map((score, index) => {
        return (
          <div className='row' key={index}>
            <div>{score.nickname}</div>
            <div>{score.difficulty}</div>
            <div>{score.time}</div>
            <div>{score["3BV"]}</div>
            <div>{score.score}</div>
          </div>
        );
      })}
    </div>
  );
}

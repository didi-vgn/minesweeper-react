export default function Row({ nickname, gameMode, time, bbbv, score }) {
  return (
    <div className='grid grid-cols-5 text-center p-5 font-medium border rounded-md bg-gray-600 text-gray-50 hover:bg-gray-500 m-1'>
      <div>{nickname}</div>
      <div>{gameMode}</div>
      <div>{time}</div>
      <div>{bbbv}</div>
      <div>{score}</div>
    </div>
  );
}

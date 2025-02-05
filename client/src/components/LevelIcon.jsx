export default function LevelIcon({ level, icon }) {
  return (
    <div className='flex flex-col justify-around items-center custom-border bg-gray-300 size-30'>
      <div className='text-xl'>{level}</div>
      <div className='text-6xl'>{icon}</div>
    </div>
  );
}

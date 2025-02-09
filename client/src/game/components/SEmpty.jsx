import Player from "./Player";

const green = "/gem_green.png";
const yellow = "/gem_yellow.png";
const white = "/gem_white.png";
const pink = "/gem_pink.png";
const blue = "/gem_blue.png";
const golden = "/gem_golden.png";

export default function SEmpty({ player, cell }) {
  const gems = {
    green: green,
    yellow: yellow,
    white: white,
    pink: pink,
    blue: blue,
    golden: golden,
  };

  return (
    <div className='relative'>
      <img src='/forest_tile.png' alt='tile' className='w-full h-full' />
      {(cell.value >= 0 &&
        ((cell.gem.color !== "" && !cell.gem.collected && (
          <img
            src={gems[cell.gem.color]}
            alt=''
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_35px_35px_rgba(75, 38, 3, 0.8)]'
          />
        )) || (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'>
            {cell.value === 0 ? "" : cell.value}
          </div>
        ))) ||
        (cell.value === -1 && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'>
            💣
          </div>
        ))}
      {player && <Player />}
    </div>
  );
}

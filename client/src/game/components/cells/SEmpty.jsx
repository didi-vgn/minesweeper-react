import { useAdventureContext } from "../../context/AdventureContext";
import { gemColors } from "../../utils/assets";
import Player from "../Player";

export default function SEmpty({ player, cell }) {
  const { mapSkin } = useAdventureContext();

  return (
    <div className='relative'>
      <img src={mapSkin.tile} alt='tile' className='w-full h-full' />
      {(cell.value >= 0 &&
        ((cell.gem.color !== "" && !cell.gem.collected && (
          <img
            src={gemColors[cell.gem.color]}
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

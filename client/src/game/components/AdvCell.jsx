import { useAdventureContext } from "../context/AdventureContext";
import { TiWarningOutline } from "react-icons/ti";

import { gemColors } from "../utils/assets";
import Player from "./Player";
import React from "react";

const AdvCell = React.memo(({ cell, player }) => {
  const { mapSkin } = useAdventureContext();
  return (
    <div>
      <div className='w-[64px] h-[64px]'>
        {(cell.clicked && (
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
          </div>
        )) || (
          <div className='relative'>
            <img src={mapSkin.cover} alt='' />
            {cell.scanned && cell.value === -1 && (
              <div className='absolute top-1 left-1 z-999 text-red-500 text-[60px] drop-shadow-[0_1px_0.5px_rgba(255,255,255,1)]'>
                <TiWarningOutline />
              </div>
            )}
          </div>
        )}
      </div>
      {player && <Player />}
    </div>
  );
});
export default AdvCell;

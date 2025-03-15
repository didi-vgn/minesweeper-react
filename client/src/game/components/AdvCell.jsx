import { useAdventureContext } from "../context/AdventureContext";
import { TiWarningOutline } from "react-icons/ti";
import { gemColors, colors } from "../utils/assets";
import Player from "./Player";
import React from "react";

const AdvCell = React.memo(({ cell, player }) => {
  const { preferences } = useAdventureContext();

  return (
    <div>
      <div className='w-[64px] h-[64px]'>
        {(cell.clicked && (
          <div className='relative'>
            <img
              src={preferences.mapSkin?.tile}
              alt='tile'
              className='w-full h-full'
            />
            {(cell.value >= 0 &&
              ((cell.gem && (
                <img
                  src={gemColors[cell.gem]}
                  alt=''
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                />
              )) ||
                (cell.scanner && (
                  <img
                    src={gemColors["scanner"]}
                    alt=''
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  />
                )) || (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-outline-black'>
                    <div className={`${colors[cell.value]}`}>
                      {cell.value === 0 ? "" : cell.value}
                    </div>
                  </div>
                ))) ||
              (cell.value === -1 && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl'>
                  💣
                </div>
              ))}
          </div>
        )) || (
          <div className='relative'>
            <img src={preferences.mapSkin?.cover} alt='' />
            {cell.scanned && cell.value === -1 && (
              <div className='absolute top-[0.5px] left-[0.5px] z-999 text-slate-900 text-[60px] font-outline'>
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

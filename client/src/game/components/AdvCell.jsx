import { useAdventureContext } from "../context/AdventureContext";
import { TiWarningOutline } from "react-icons/ti";
import { gemColors, colors, other } from "../utils/assets";
import Player from "./Player";
import React from "react";

const AdvCell = React.memo(({ cell, player }) => {
  const { preferences } = useAdventureContext();
  return (
    <div className='relative'>
      <div className='w-[64px] h-[64px]'>
        {cell.value === -2 ? (
          ""
        ) : cell.clicked ? (
          <div>
            <img src={preferences.mapSkin.tile} alt='' />
            <div className='absolute bottom-0 left-0 text-4xl w-full h-full flex justify-center items-center'>
              {cell.gem ? (
                <img src={gemColors[cell.gem]} alt='' className='' />
              ) : cell.scanner ? (
                <img src={other.scanner} alt='' />
              ) : cell.portal ? (
                <img src={other.portal} alt='' />
              ) : cell.value > 0 ? (
                <div className={`${colors[cell.value]} font-outline-black`}>
                  {cell.value}
                </div>
              ) : cell.value === -1 ? (
                <img src={other.bomb} alt='' />
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div>
            <img src={preferences.mapSkin.cover} alt='' />
            {cell.scanned && (
              <div className='absolute bottom-0 left-0 text-4xl w-full h-full flex justify-center items-center font-outline'>
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

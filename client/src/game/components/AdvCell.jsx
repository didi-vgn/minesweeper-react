import { TiWarningOutline } from "react-icons/ti";
import { gemColors, colors, other } from "../utils/assets";
import Player from "./Player";
import React from "react";

const AdvCell = ({ cell, player, preferences }) => {
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
              ) : cell.extraTime ? (
                <img src={other.hourglassIcon} alt='' />
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
      {player && <Player helper={cell.portal ? "press E" : ""} />}
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  const prevCell = prevProps.cell;
  const nextCell = nextProps.cell;

  return (
    prevCell.value === nextCell.value &&
    prevCell.clicked === nextCell.clicked &&
    prevCell.gem === nextCell.gem &&
    prevCell.scanner === nextCell.scanner &&
    prevCell.portal === nextCell.portal &&
    prevCell.extraTime === nextCell.extraTime &&
    prevCell.scanned === nextCell.scanned &&
    prevProps.player === nextProps.player &&
    prevProps.preferences.mapSkin.tile === nextProps.preferences.mapSkin.tile &&
    prevProps.preferences.mapSkin.cover === nextProps.preferences.mapSkin.cover
  );
}
export default React.memo(AdvCell, areEqual);

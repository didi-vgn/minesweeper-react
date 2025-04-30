import { TiWarningOutline } from "react-icons/ti";
import { gemColors, colors, other, mapSkins } from "../utils/assets";
import Player from "./Player";
import React from "react";

const AdvCell = ({ cell, player, preferences }) => {
  return (
    <div className='relative'>
      <div className='w-[64px] h-[64px]'>
        {cell.value === -2 ? null : cell.clicked ? (
          <div>
            <img src={mapSkins[preferences.mapSkin].tile} alt='Tile' />
            <div className='absolute bottom-0 left-0 text-4xl w-full h-full'>
              <Values val={cell.value} />
              {!player && <Items cell={cell} />}
              {player && (
                <div className='absolute bottom-0 left-0'>
                  <Player helper={cell.portal ? "press E" : ""} />
                </div>
              )}
              {cell.portal && <img src={other.portal} alt='Portal' />}
            </div>
          </div>
        ) : (
          <div>
            <img src={mapSkins[preferences.mapSkin].cover} alt='Cover' />
            {cell.scanned && (
              <div className='absolute bottom-0 left-0 text-4xl w-full h-full flex justify-center items-center font-outline'>
                <TiWarningOutline />
              </div>
            )}
            {player && (
              <div className='absolute bottom-0 left-0'>
                <Player helper={cell.portal ? "press E" : ""} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Values = ({ val }) => {
  return (
    <>
      {val > 0 ? (
        <div
          className={`${colors[val]} font-outline-black w-full h-full flex justify-center items-center absolute z-1`}
        >
          {val}
        </div>
      ) : val === -1 ? (
        <img src={other.bomb} alt='Bomb' />
      ) : null}
    </>
  );
};

const Items = ({ cell }) => {
  return (
    <div className='w-full h-full absolute z-2'>
      {cell.gem ? (
        <img src={gemColors[cell.gem]} alt='Gem' />
      ) : cell.scanner ? (
        <img src={other.scanner} alt='Scanner' />
      ) : cell.extraTime ? (
        <img src={other.hourglassIcon} alt='Hourglass' />
      ) : null}
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
    prevProps.preferences.mapSkin === nextProps.preferences.mapSkin
  );
}
export default React.memo(AdvCell, areEqual);

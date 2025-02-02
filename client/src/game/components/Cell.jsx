import Bomb from "./cells/Bomb";
import Empty from "./cells/Empty";
import Number from "./cells/Number";
import Flag from "./cells/Flag";
import Cover from "./cells/Cover";

export default function Cell({ cell, onClick, onRightClick }) {
  return (
    <div
      className='flex items-center justify-center'
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {cell.clicked && cell.value === -1 ? (
        <Bomb />
      ) : cell.clicked && cell.value === 0 ? (
        <Empty />
      ) : (
        cell.clicked && <Number value={cell.value} />
      )}
      {(cell.flagged && <Flag />) || (!cell.clicked && <Cover />)}
    </div>
  );
}

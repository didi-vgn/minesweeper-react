import { colors } from "../game/utils/assets";

export default function PrettyTitle({ string }) {
  const title = string.split("");

  return (
    <div className='font-outline-black flex'>
      {title.map((char, i) => (
        <div key={i} className={colors[(i % 8) + 1]}>
          {char === " " ? <div style={{ minWidth: "0.5em" }} /> : char}
        </div>
      ))}
    </div>
  );
}

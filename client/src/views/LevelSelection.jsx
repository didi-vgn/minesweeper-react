import { BsBackpack3Fill } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import { BsBinocularsFill } from "react-icons/bs";
import { CgBot } from "react-icons/cg";
import { FiCodesandbox } from "react-icons/fi";
import { FiCpu } from "react-icons/fi";
import LevelIcon from "../components/LevelIcon";
import { useNavigate } from "react-router-dom";
import { useAdventureContext } from "../game/context/AdventureContext";

export default function LevelSelection() {
  const { surviveLevel } = useAdventureContext();
  const navigate = useNavigate();

  function handleSelectLevel(width, height, bombs) {
    surviveLevel(width, height, bombs);
    navigate("/adventure/play");
  }

  return (
    <div className='m-15'>
      <div className='text-2xl'>Survival mode</div>
      <div className='text-sm'>
        Bombs are generated randomly, you might not survive to reach the end...
      </div>
      <div className='grid grid-cols-4 gap-5 m-5 w-7/10'>
        {surviveLevels.map((level, index) => (
          <LevelIcon
            key={index + 1}
            onClick={() => handleSelectLevel(level.w, 9, level.b)}
            level={index + 1}
            icon={level.icon}
          />
        ))}
      </div>
      <div className='text-2xl'>Story mode</div>
      <div className='text-sm'>
        Each bomb was carefully planted, but they are set to explode when the
        time runs out...
      </div>
      <div className='grid grid-cols-4 gap-5 m-5 w-7/10'>
        <LevelIcon level={1} icon={<BsBackpack3Fill />} />
        <LevelIcon level={2} icon={<BsBagHeart />} />
        <LevelIcon level={3} icon={<BsBinocularsFill />} />
        <LevelIcon level={4} icon={<CgBot />} />
        <LevelIcon level={5} icon={<FiCodesandbox />} />
        <LevelIcon level={6} icon={<FiCpu />} />
      </div>
    </div>
  );
}

const surviveLevels = [
  {
    icon: <BsBackpack3Fill />,
    w: 50,
    b: 50,
  },
  {
    icon: <BsBagHeart />,
    w: 60,
    b: 75,
  },
  {
    icon: <BsBinocularsFill />,
    w: 70,
    b: 100,
  },
  {
    icon: <CgBot />,
    w: 80,
    b: 125,
  },
  {
    icon: <FiCodesandbox />,
    w: 90,
    b: 150,
  },
  {
    icon: <FiCpu />,
    w: 100,
    b: 175,
  },
];

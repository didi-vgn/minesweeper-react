import Header from "../components/Header";
import LevelIcon from "../components/LevelIcon";
import ProfileButton from "../components/ProfileButton";
import { StoryProvider } from "../game/context/StoryContext";
import StoryApp from "../game/StoryApp";
import { BsBackpack3Fill } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import { BsBinocularsFill } from "react-icons/bs";
import { CgBot } from "react-icons/cg";
import { FiCodesandbox } from "react-icons/fi";
import { FiCpu } from "react-icons/fi";

export default function Story() {
  return (
    <div>
      <StoryProvider>
        <Header>
          <ProfileButton />
        </Header>
        <div className='m-15'>
          {/* <StoryApp /> */}
          <div className='text-2xl'>Survival mode</div>
          <div className='text-sm'>
            Bombs are generated randomly, you might not survive to reach the
            end...
          </div>
          <div className='grid grid-cols-7 gap-5 m-15'>
            <LevelIcon level={1} icon={<BsBackpack3Fill />} />
            <LevelIcon level={2} icon={<BsBagHeart />} />
            <LevelIcon level={3} icon={<BsBinocularsFill />} />
            <LevelIcon level={4} icon={<CgBot />} />
            <LevelIcon level={5} icon={<FiCodesandbox />} />
            <LevelIcon level={6} icon={<FiCpu />} />
          </div>
          <div className='text-2xl'>Story mode</div>
          <div className='text-sm'>
            Each bomb was carefully planted, but they are set to explode when
            the time runs out...
          </div>
          <div className='grid grid-cols-7 gap-5 m-15'>
            <LevelIcon level={1} icon={<BsBackpack3Fill />} />
            <LevelIcon level={2} icon={<BsBagHeart />} />
            <LevelIcon level={3} icon={<BsBinocularsFill />} />
            <LevelIcon level={4} icon={<CgBot />} />
            <LevelIcon level={5} icon={<FiCodesandbox />} />
            <LevelIcon level={6} icon={<FiCpu />} />
          </div>
        </div>
      </StoryProvider>
    </div>
  );
}

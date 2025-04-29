import PrettyTitle from "../../components/PrettyTitle";
import SmallButton from "../../components/SmallButton";
import { gemColors, other } from "../../game/utils/assets";

export default function HowToPlay({ back }) {
  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3'>
        <SmallButton onClick={back} text='Back' />
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='How to Play' />
        </div>
      </div>
      <div className='m-10 text-lg flex flex-col gap-6 w-3/5 mx-auto'>
        <div>
          <div className='font-bold'>Objective: </div>
          <div>
            Move through the map and collect colorful stars to earn points!
          </div>
        </div>
        <div>
          <div className='font-bold'>Controls: </div>
          <div>Arrow Keys → Move your character.</div>
          <div>
            Spacebar → Use a magic orb
            <img
              src={other.scanner}
              alt='Rainbow Gem'
              className='inline size-8'
            />{" "}
            to scan the 8 surrounding cells for hidden bombs.
          </div>
          <div>
            E → Enter portals
            <img
              src={other.portal}
              alt='Rainbow Gem'
              className='inline size-7'
            />{" "}
            in the Dungeon to progress to the next level.
          </div>
        </div>
        <div>
          <div className='font-bold'>Scoring: </div>
          <div>
            Collecting more stars
            <img
              src={gemColors.rainbow}
              alt='Rainbow Gem'
              className='inline size-7'
            />{" "}
            increases your score, so take your time to gather as many as you
            can!
          </div>
          <div>
            To finish each <span className='font-bold'>Adventure</span> level,
            collect the Golden Star
            <img
              src={gemColors.golden}
              alt='Golden Gem'
              className='inline size-7'
            />
            .
          </div>
          <div>
            In the <span className='font-bold'>Dungeon</span>, find a Portal to
            advance to the next level and earn a higher score by going deeper.
          </div>
        </div>
        <div>
          <div className='font-bold'>Watch out for bombs! </div>
          <div>
            Hidden bombs
            <img
              src={other.bomb}
              alt='Golden Gem'
              className='inline size-7'
            />{" "}
            are scattered across the map—stepping on one results in defeat.
          </div>
          <div>
            Some cells display a number showing how many bombs are in the 8
            surrounding cells. Use this information to avoid them and plan your
            moves wisely.
          </div>
          <div>Use orbs to reveal bombs and plan your path safely.</div>
        </div>
        <div>
          <div className='font-bold'>Bonus </div>
          Time capsules
          <img
            src={other.hourglassIcon}
            alt='Golden Gem'
            className='inline size-7'
          />{" "}
          may spawn in the <span className='font-bold'>Dungeon</span>, granting
          you 30 extra seconds if you collect them.
        </div>
        <div className='font-bold'>Good luck and have fun exploring!</div>
      </div>
    </div>
  );
}

import PrettyTitle from "./PrettyTitle";

export default function HowToPlay({ back }) {
  return (
    <div>
      <div className='grid grid-cols-3'>
        <div
          className='custom-border bg-gray-300 place-self-start px-3 cursor-pointer'
          onClick={back}
        >
          Back
        </div>
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='How to Play' />
        </div>
      </div>
      <div className='m-10 text-lg flex flex-col gap-6'>
        <div>
          Move through the map, collect colorful stars, and find the Golden Star
          to win!
        </div>
        <div>
          <div className='font-bold'>Controls: </div>
          <div>Arrow Keys → Move your character.</div>
          <div>
            Spacebar → Use a magic orb
            <img
              src='/gem/scanner.png'
              alt='Rainbow Gem'
              className='inline size-8'
            />
            to scan the 8 surrounding cells for hidden bombs.
          </div>
        </div>
        <div>
          <div className='font-bold'>Scoring: </div>
          <div>
            Collecting more stars
            <img
              src='/gem/gem_rainbow.png'
              alt='Rainbow Gem'
              className='inline size-7'
            />{" "}
            increases your score - so take your time to gather them!
          </div>
          <div>
            Win the game by collecting the Golden Star
            <img
              src='/gem/gem_golden.png'
              alt='Golden Gem'
              className='inline size-7'
            />
            .
          </div>
        </div>
        <div>
          <div className='font-bold'>Watch out for bombs! </div>
          <div>Hidden bombs are scattered across the map.</div>
          <div>Stepping on a bomb results in defeat—be careful!</div>
          <div>
            Some cells display a number indicating how many bombs are in the 8
            cells around them. Use this information to avoid bombs and
            strategize your moves!
          </div>
          <div>Use orbs to reveal bombs and plan your path safely.</div>
        </div>
      </div>
    </div>
  );
}

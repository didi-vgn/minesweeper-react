import PrettyTitle from "../../components/PrettyTitle";
import SmallButton from "../../components/SmallButton";

export default function Credits({ back }) {
  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3'>
        <SmallButton onClick={back} text='Back' />
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='Credits' />
        </div>
      </div>
      <div className='flex justify-center m-25'>
        <div className='text-xl flex flex-col gap-6'>
          <div>
            Font: Silkscreen by{" "}
            <a
              href='https://www.dafont.com/silkscreen.font'
              className='underline inline'
            >
              Jason Kottke.
            </a>
          </div>
          <div>
            Icons:
            <li>
              <a
                href='https://github.com/Remix-Design/RemixIcon'
                className='underline'
              >
                Remix Icon
              </a>
            </li>
            <li>
              <a
                href='http://google.github.io/material-design-icons/'
                className='underline'
              >
                Material Design icons
              </a>
            </li>
            <li>
              <a
                href='https://github.com/phosphor-icons/core'
                className='underline'
              >
                Phosphor Icons
              </a>
            </li>
            <li>
              <a href='https://fontawesome.com/' className='underline'>
                Font Awesome
              </a>
            </li>
            <li>
              <a href='https://icons.radix-ui.com' className='underline'>
                Radix Icons
              </a>
            </li>
            <li>
              <a
                href='https://github.com/lykmapipo/themify-icons'
                className='underline'
              >
                Themify Icons
              </a>
            </li>
            <li>
              <a href='http://s-ings.com/typicons/' className='underline'>
                Typicons
              </a>
            </li>
            <li>
              <a
                href='https://github.com/tailwindlabs/heroicons'
                className='underline'
              >
                Heroicons
              </a>
            </li>
          </div>
          <div>
            Sound and music:
            <li>
              <a
                href='https://www.zapsplat.com/author/audio-hero/'
                className='underline'
              >
                Audio Hero
              </a>
            </li>
            <li>
              <a
                href='https://www.zapsplat.com/author/zapsplat/'
                className='underline'
              >
                ZapSplat
              </a>
            </li>
          </div>
          <div>Artwork: Inspired by Stardew Valley.</div>
        </div>
      </div>
    </div>
  );
}

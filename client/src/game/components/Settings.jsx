import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { useAdventureContext } from "../context/AdventureContext";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { icons } from "../utils/assets";

export default function Settings() {
  const { settings, setSettings } = useAdventureContext();

  function handleCharacterChange(e) {
    setSettings((prev) => ({ ...prev, character: e.target.value }));
  }

  function handleMapChange(e) {
    setSettings((prev) => ({ ...prev, map: e.target.value }));
  }

  return (
    <div className='m-10 flex flex-col gap-20 items-center'>
      <div className='flex gap-30'>
        <div>
          Character:
          {(settings.character === "random" && (
            <div className='flex items-center justify-center size-20 text-7xl'>
              <GiPerspectiveDiceSixFacesRandom />
            </div>
          )) || (
            <img src={icons[settings.character]} alt='' className='size-20' />
          )}
          <select
            name='character'
            id='character'
            defaultValue={settings.character}
            onChange={handleCharacterChange}
          >
            <option value='pink'>Zaya</option>
            <option value='blue'>Luma</option>
            <option value='green'>Rilo</option>
            <option value='yellow'>Milio</option>
            <option value='white'>Inka</option>
            <option value='random'>Random</option>
          </select>
        </div>
        <div>
          Map:
          {(settings.map === "random" && (
            <div className='flex items-center justify-center size-20 text-7xl'>
              <GiPerspectiveDiceSixFacesRandom />
            </div>
          )) || <img src={icons[settings.map]} alt='' className='size-20' />}
          <select
            name='map'
            id='map'
            defaultValue={settings.map}
            onChange={handleMapChange}
          >
            <option value='cave'>Cave</option>
            <option value='snow'>Snow</option>
            <option value='forest'>Forest</option>
            <option value='random'>Random</option>
          </select>
        </div>
      </div>

      <div className='flex gap-5 text-4xl'>
        <MdMusicOff />
        <input type='range' min={0} max={100} step={10} className='w-80' />
        <MdMusicNote />
      </div>
    </div>
  );
}

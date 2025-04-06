import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { useAdventureContext } from "../../game/context/AdventureContext";
import PrettyTitle from "../../game/components/PrettyTitle";
import { icons } from "../../game/utils/assets";
import { useState } from "react";

export default function GameSettings({ back }) {
  const { settings, setSettings } = useAdventureContext();

  const characters = [
    { name: "Random", value: "random" },
    { name: "Lola", value: "pink" },
    { name: "Luma", value: "blue" },
    { name: "Rilo", value: "green" },
    { name: "Milio", value: "yellow" },
    { name: "Inka", value: "white" },
  ];
  const maps = [
    { name: "Random", value: "random" },
    { name: "Snow", value: "snow" },
    { name: "Cave", value: "cave" },
    { name: "Forest", value: "forest" },
  ];

  function handleCharacterChange(val) {
    setSettings((prev) => ({ ...prev, character: val }));
  }

  function handleMapChange(val) {
    setSettings((prev) => ({ ...prev, map: val }));
  }

  function handleMusicVolume(e) {
    setSettings((prev) => ({ ...prev, music: e.target.value }));
  }

  function handleSfxVolume(e) {
    setSettings((prev) => ({ ...prev, sfx: e.target.value }));
  }

  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3 mb-10'>
        <div
          className='custom-border bg-gray-300 place-self-start w-23 text-center cursor-pointer'
          onClick={back}
        >
          Back
        </div>
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='Settings' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-10 text-2xl m-20'>
        <div className='flex flex-col items-center gap-3'>
          <div className='text-3xl'>Character</div>
          <Select
            init={settings.character}
            arr={characters}
            callback={handleCharacterChange}
          />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <div className='text-3xl'>Map</div>
          <Select init={settings.map} arr={maps} callback={handleMapChange} />
        </div>

        <div className='flex gap-5 text-4xl mt-7 col-span-2 place-self-center'>
          <div className='w-30 text-end'>Music</div>
          <MdMusicOff />
          <input
            type='range'
            min={0}
            max={1}
            step={0.1}
            value={settings.music}
            className='w-80'
            onChange={handleMusicVolume}
          />
          <MdMusicNote />
        </div>
        <div className='flex gap-5 text-4xl mt-7 col-span-2 place-self-center'>
          <div className='w-30 text-end'>SFX</div>
          <MdMusicOff />
          <input
            type='range'
            min={0}
            max={1}
            step={0.1}
            value={settings.sfx}
            className='w-80'
            onChange={handleSfxVolume}
          />
          <MdMusicNote />
        </div>
      </div>
    </div>
  );
}

function Select({ init, arr, callback }) {
  const [selected, setSelected] = useState(
    arr.findIndex((el) => el.value === init)
  );

  function handleChange(val) {
    const newPos = selected + val;
    if (newPos >= arr.length) {
      setSelected(0);
      callback(arr[0].value);
    } else if (newPos < 0) {
      setSelected(arr.length - 1);
      callback(arr[arr.length - 1].value);
    } else {
      setSelected(newPos);
      callback(arr[newPos].value);
    }
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex items-center gap-2'>
        <div
          className='text-5xl cursor-pointer'
          onClick={() => handleChange(-1)}
        >
          {"<"}
        </div>

        <img
          src={icons[arr[selected].value]}
          alt={icons[arr[selected].name]}
          className='size-25 custom-border-rev'
        />
        <div
          className='text-5xl cursor-pointer'
          onClick={() => handleChange(+1)}
        >
          {">"}
        </div>
      </div>
      <div className='text-center'>{arr[selected].name}</div>
    </div>
  );
}

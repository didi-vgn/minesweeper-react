import LevelIcon from "../game/components/LevelIcon";
import { useAdventureContext } from "../game/context/AdventureContext";
import { useEffect, useRef, useState } from "react";
import Settings from "../game/components/Settings";
import { adventureLevels } from "../game/utils/levelsData";
import { useAuthContext } from "../context/AuthContext";
import { getAdvGames } from "../services/adventureGamesServices";
import AdventureApp from "../game/AdventureApp";
import { useLocation } from "react-router-dom";
import PrettyTitle from "../game/components/PrettyTitle";
import { audio, playSoundEffect } from "../game/utils/assets";
import HowToPlay from "../game/components/HowToPlay";

export default function AdventureMenu() {
  const { user } = useAuthContext();
  const { newGame, settings } = useAdventureContext();
  const [progress, setProgress] = useState([]);
  const [currentTab, setCurrentTab] = useState("menu");
  const musicRef = useRef(new Audio(audio.music.main));
  const location = useLocation();
  const [interact, setInteract] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setInteract(true);
      document.removeEventListener("click", handleUserInteraction);
    };
    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  function handleSelectLevel(levelData) {
    newGame(levelData);
    setCurrentTab("play");
  }

  function back() {
    setCurrentTab("menu");
  }

  useEffect(() => {
    const music = musicRef.current;
    if (location.pathname === "/adventure") {
      if (music.paused) {
        music.volume = settings.music;
        music.loop = true;
        music.play().catch((err) => console.log("Autoplay blocked:", err));
      }
    } else {
      music.pause();
      music.currentTime = 0;
    }

    return () => {
      music.pause();
    };
  }, [interact, location.pathname, settings.music]);

  useEffect(() => {
    if (currentTab !== "levels") return;
    async function fetchGameProgress() {
      try {
        const response = await getAdvGames(user.id);
        setProgress(response.games);
      } catch (err) {
        console.error(err);
      }
    }
    function fetchLocalGameProgress() {
      try {
        const localProgress = JSON.parse(localStorage.getItem("localProgress"));
        if (localProgress) {
          setProgress(localProgress);
        }
      } catch (err) {
        console.error("Failed to read from local storage", err);
      }
    }

    (user && fetchGameProgress()) || fetchLocalGameProgress();
  }, [user, currentTab]);

  return (
    <div>
      {currentTab === "menu" && (
        <Menu
          play={() => setCurrentTab("levels")}
          settings={() => setCurrentTab("settings")}
          info={() => setCurrentTab("info")}
          sfx={settings.sfx}
        />
      )}
      {currentTab === "levels" && (
        <Levels
          progress={progress}
          back={back}
          selectLevel={handleSelectLevel}
        />
      )}
      {currentTab === "settings" && <Settings back={back} />}
      {currentTab === "info" && <HowToPlay back={back} />}
      {currentTab === "play" && (
        <AdventureApp
          onClick={() => setCurrentTab("levels")}
          progress={progress}
        />
      )}
    </div>
  );
}

function Menu({ play, settings, info, sfx }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-8xl m-15'>
        <PrettyTitle string='Adventure' />
      </div>
      <div
        className='text-6xl m-3 cursor-pointer hover:scale-150'
        onClick={play}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Play
      </div>
      <div
        className='text-4xl m-3 cursor-pointer hover:scale-150'
        onClick={settings}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Settings
      </div>
      <div
        className='text-4xl m-3 cursor-pointer hover:scale-150'
        onClick={info}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        How to Play
      </div>
    </div>
  );
}

function Levels({ progress, back, selectLevel }) {
  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3'>
        <div
          className='custom-border bg-gray-300 place-self-start px-3 cursor-pointer'
          onClick={back}
        >
          Back
        </div>
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='Play' />
        </div>
        <div className='grid grid-rows-2 place-self-end'>
          <div>
            {progress.reduce((acc, curr) => acc + curr.points, 0)} points
          </div>
          <div>
            {progress.reduce((acc, curr) => acc + curr.collectedGems, 0)}/
            {adventureLevels.reduce((acc, curr) => acc + curr.gems, 0)} gems
          </div>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-3 m-5'>
        {adventureLevels.map((level, index) => (
          <LevelIcon
            key={index + 1}
            onClick={() => selectLevel(level)}
            level={level.id}
            data={progress.find((level) => level.levelId === index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

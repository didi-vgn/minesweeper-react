import Header from "../../components/Header";
import ProfileButton from "../../components/ProfileButton";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useAdventureContext } from "../../game/context/AdventureContext";
import { getAdvGames } from "../../services/adventureGamesServices";
import AdventureApp from "../../game/AdventureApp";
import { audio } from "../../game/utils/assets";
import AdventureLevelSelection from "./AdventureLevelSelection";
import HowToPlay from "./HowToPlay";
import ClassicApp from "../../game/ClassicApp";
import DungenApp from "../../game/DungeonApp";
import GameMenu from "./GameMenu";
import GameSettings from "./GameSettings";
import Credits from "./Credits";

export default function Game() {
  const { user } = useAuthContext();
  const { settings, actions } = useAdventureContext();
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

  function back() {
    setCurrentTab("menu");
  }

  function startDungeon() {
    actions.newDungeon();
    setCurrentTab("dungeon");
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
        console.error(err);
      }
    }

    user ? fetchGameProgress() : fetchLocalGameProgress();
  }, [user, currentTab]);

  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='silkscreen h-fit p-5'>
        {currentTab === "menu" && (
          <GameMenu
            classic={() => setCurrentTab("classic")}
            adventure={() => setCurrentTab("levels")}
            dungeon={startDungeon}
            settings={() => setCurrentTab("settings")}
            info={() => setCurrentTab("info")}
            credits={() => setCurrentTab("credits")}
            sfx={settings.sfx}
          />
        )}
        {currentTab === "levels" && (
          <AdventureLevelSelection
            back={back}
            progress={progress}
            play={() => setCurrentTab("adventure")}
          />
        )}
        {currentTab === "settings" && <GameSettings back={back} />}
        {currentTab === "info" && <HowToPlay back={back} />}
        {currentTab === "credits" && <Credits back={back} />}
        {currentTab === "classic" && <ClassicApp back={back} />}
        {currentTab === "adventure" && (
          <AdventureApp
            back={() => setCurrentTab("levels")}
            progress={progress}
          />
        )}
        {currentTab === "dungeon" && <DungenApp back={back} />}
      </div>
    </div>
  );
}

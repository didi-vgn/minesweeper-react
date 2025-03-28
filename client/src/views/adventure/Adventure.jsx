import Header from "../../components/Header";
import ProfileButton from "../../components/ProfileButton";
import AdventureMenu from "./AdventureMenu";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useAdventureContext } from "../../game/context/AdventureContext";
import AdventureSettings from "./AdventureSettings";
import { getAdvGames } from "../../services/adventureGamesServices";
import AdventureApp from "../../game/AdventureApp";
import { audio } from "../../game/utils/assets";
import AdventureLevelSelection from "./AdventureLevelSelection";
import HowToPlay from "./HowToPlay";

export default function Adventure() {
  const { user } = useAuthContext();
  const { settings } = useAdventureContext();
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
      <Header>
        <ProfileButton />
      </Header>
      <div className='flex justify-center relative select-none silkscreen'>
        <div className='m-10 p-3 custom-border bg-gray-300 h-[45rem] w-[72rem]'>
          <div className='custom-border-rev h-full bg-gray-100 p-7'>
            <div>
              {currentTab === "menu" && (
                <AdventureMenu
                  play={() => setCurrentTab("levels")}
                  settings={() => setCurrentTab("settings")}
                  info={() => setCurrentTab("info")}
                  sfx={settings.sfx}
                />
              )}
              {currentTab === "levels" && (
                <AdventureLevelSelection
                  back={back}
                  progress={progress}
                  play={() => setCurrentTab("play")}
                />
              )}
              {currentTab === "settings" && <AdventureSettings back={back} />}
              {currentTab === "info" && <HowToPlay back={back} />}
              {currentTab === "play" && (
                <AdventureApp
                  onClick={() => setCurrentTab("levels")}
                  progress={progress}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

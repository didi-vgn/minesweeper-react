import { createContext, useContext, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const StatsContext = createContext(null);

export function useStatsContext() {
  return useContext(StatsContext);
}

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    userId: null,
    mode: "",
    time: 0,
    bbbv: 0,
    points: 0,
  });

  return <StatsContext.Provider>{children}</StatsContext.Provider>;
}

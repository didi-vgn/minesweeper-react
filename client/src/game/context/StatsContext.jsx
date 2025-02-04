import { createContext, useContext, useState } from "react";

const StatsContext = createContext(null);

export function useStatsContext() {
  return useContext(StatsContext);
}

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    bombs: 0,
    time: 0,
    bbbv: 0,
    board: [],
  });

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

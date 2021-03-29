import { getLeaderboardData } from "api/getLeaderboardData";
import { DateTime } from "luxon";
import { createContext, useEffect, useRef, useState } from "react";
import { Leaderboard } from "types/Leaderboard";
import { sleep } from "utils/sleep";

export const LeaderboardContext = createContext<{
  lbData?: Leaderboard;
  changes?: { [key: number]: number };
  lastUpdated?: Date;
}>({});

export const LeaderboardProvider = ({ children }) => {
  const [lbData, setLbData] = useState<Leaderboard>();
  const [changes, setChanges] = useState<{ [key: number]: number }>({});
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [interval] = useState<number>(30000);

  const oldLb = useRef<Leaderboard>();

  useEffect(() => {
    let killMe = false;
    const loop = async () => {
      // get muni
      const data = await getLeaderboardData();
      if (!killMe) {
        updateData(data);
        await sleep(interval);
        loop();
      }
    };
    loop();
    () => {
      killMe = true;
    };
  }, [interval]);

  const updateData = (data: Leaderboard) => {
    if (oldLb.current) {
      setChanges((previousChanges) => {
        const changes = data.map((d) => {
          const old = oldLb.current?.find((olb) => olb.rank === d.rank);
          const dPoints = d.points - old.points;
          return [
            d.rank,
            // Only update if the new point is not 0 and not old enough
            dPoints > 0
              ? dPoints
              : DateTime.fromISO(d.date).diffNow().as("minutes") > -4
              ? previousChanges[d.rank]
              : 0,
          ];
        });
        return Object.fromEntries(changes);
      });
    }
    oldLb.current = data;
    setLbData(data);
    setLastUpdated(new Date());
  };

  return (
    <LeaderboardContext.Provider value={{ lbData, changes, lastUpdated }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

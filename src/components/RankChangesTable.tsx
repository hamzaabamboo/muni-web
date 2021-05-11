import React, { useContext, useMemo } from "react";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { Tier } from "types/Leaderboard";
import { ChangesTable } from "./ChangesTable";

export const RankChangesTable = ({ tier }: { tier: Tier }) => {
  const { pastUpdates } = useContext(LeaderboardChangesContext);

  const list = useMemo(
    () => pastUpdates?.filter((t) => t.rank === tier) ?? [],
    [pastUpdates, tier]
  );
  return <ChangesTable pastUpdates={list} />;
};

import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { getMiniLeaderboardOverview } from "api/getLeaderboardData";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { useCallback, useContext, useEffect, useState } from "react";
import { EventContext } from "src/contexts/EventContext";
import { MiniLeaderboardContext } from "src/contexts/MiniLeaderboardContext";
import { ServerContext } from "src/contexts/ServerProvider";
import { LeaderboardConfig } from "types/Leaderboard";

interface IEventAggregationMap {
  eventId: number;
  aggregationType: string;
  pointTypeName: string;
  pointTypeIconName: string;
}
export const MiniLeaderboardPicker = () => {
  const { server } = useContext(ServerContext);
  const { event } = useContext(EventContext);
  const { lbConfig, setLbConfig } = useContext(MiniLeaderboardContext);
  const [data, setData] = useState<LeaderboardConfig[]>([]);
  const [labelsMap, setLablesMap] = useState<Record<string, any>>();
  const fn = useCallback(() => getMiniLeaderboardOverview(event?.id), []);
  const fn2 = useCallback(
    () => import("../constants/eventAggregration.json"),
    []
  );
  usePromiseEffect(fn2, setLablesMap);
  usePromiseEffect(fn, setData);

  useEffect(() => {
    if (!lbConfig) {
      setLbConfig(data[0]);
    }
  }, [data]);
  return (
    <HStack>
      {data.map((d) => {
        const label = labelsMap
          ? getLabels(labelsMap[d.leaderboardType], d.leaderboardId)
          : `(${d.leaderboardType}, ${d.leaderboardId})`;
        const isSelected =
          d.leaderboardType === lbConfig?.leaderboardType &&
          d.leaderboardId === lbConfig?.leaderboardId;
        return (
          <Button
            variant={isSelected ? "solid" : "default"}
            key={label}
            onClick={() => setLbConfig(d)}
          >
            {label}
          </Button>
        );
      })}
    </HStack>
  );
};

const getLabels = (map: IEventAggregationMap, id?: number) => {
  switch (map?.aggregationType) {
    case "MainAddPoint":
      return "Overall";
    default:
      return `${map.pointTypeName}${id !== 0 ? ` ${id}` : ""}`;
  }
};

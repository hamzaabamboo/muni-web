import { useContext } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { Graph } from "./Graph";

export const ScoreGraph = ({
  width,
  height,
  isSmall = false,
  isLive = false,
}: {
  width?: number;
  height?: number;
  isSmall?: boolean;
  isLive?: boolean;
}) => {
  const { points } = useContext(GraphContext);
  const { event } = useContext(EventContext);

  return (
    <Graph
      points={points}
      startDate={event?.startdate}
      endDate={event?.rank_end}
      width={width}
      height={height}
      isSmall={isSmall}
      isLive={isLive}
    />
  );
};

import { useContext } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { GraphDisplayContext } from "src/contexts/GraphDisplayContext";
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
  const { points } = useContext(GraphDisplayContext);
  const { event } = useContext(EventContext);

  return (
    <Graph
      id="score"
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

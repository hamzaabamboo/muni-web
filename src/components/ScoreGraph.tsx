import { useContext } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { GraphDisplayContext } from "src/contexts/GraphDisplayContext";
import { Graph, GraphFlags } from "./Graph";

export const ScoreGraph = ({
  width,
  height,
  isSmall = false,
  isLive = false,
  graphFlags,
}: {
  width?: number;
  height?: number;
  isSmall?: boolean;
  isLive?: boolean;
  graphFlags?: GraphFlags;
}) => {
  const { points } = useContext(GraphDisplayContext);
  const { event } = useContext(EventContext);

  return (
    <Graph
      id="score"
      points={points}
      startDate={event?.startdate}
      endDate={event?.enddate}
      width={width}
      height={height}
      isSmall={isSmall}
      isLive={isLive}
      graphFlags={graphFlags}
    />
  );
};

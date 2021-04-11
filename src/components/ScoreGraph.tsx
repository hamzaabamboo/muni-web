import { useContext } from "react";
import { AnalysisContext } from "src/contexts/AnalysisContext";
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
  showForecast = false,
}: {
  width?: number;
  height?: number;
  isSmall?: boolean;
  isLive?: boolean;
  showForecast?: boolean;
  graphFlags?: GraphFlags;
}) => {
  const { points, displayTier } = useContext(GraphDisplayContext);
  const { event } = useContext(EventContext);
  const { forecast } = useContext(AnalysisContext);

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
      forecast={
        showForecast &&
        displayTier
          ?.filter((e) => forecast?.[e])
          .map((t) => forecast[t])
          .flatMap((e) => e)
      }
      graphFlags={graphFlags}
    />
  );
};

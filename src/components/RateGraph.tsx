import { Box } from "@chakra-ui/react";
import React, { useContext, useMemo, useRef } from "react";
import { AnalysisContext } from "src/contexts/AnalysisContext";
import { EventContext } from "src/contexts/EventContext";
import { Tier } from "types/Leaderboard";
import { useSize } from "web-api-hooks";
import { Graph, GraphFlags } from "./Graph";

export const RateGraph = ({
  tier,
  graphFlags,
}: {
  tier?: Tier;
  graphFlags?: GraphFlags;
}) => {
  const { rate } = useContext(AnalysisContext);
  const { event } = useContext(EventContext);

  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

  const graphData = useMemo(() => rate?.[tier], [rate, tier]);

  return (
    <Box ref={graphRef} minH="300px" w="full">
      <Graph
        id={`Rate`}
        startDate={event?.startdate}
        endDate={event?.enddate}
        width={width}
        height={height}
        graphFlags={
          graphFlags ?? {
            advancedZoom: false,
            showTooltip: false,
          }
        }
        points={
          graphData
            ? graphData
            : rate
            ? Object.values(rate).flatMap((e) => e)
            : []
        }
        isSmall
      />
    </Box>
  );
};

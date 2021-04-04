import { Box } from "@chakra-ui/react";
import React, { useContext, useMemo, useRef } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { Tier } from "types/Leaderboard";
import { useSize } from "web-api-hooks";
import { Graph } from "./Graph";

export const PlayerGraph = ({ tier }: { tier: Tier }) => {
  const { points } = useContext(GraphContext);
  const { event } = useContext(EventContext);

  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

  const graphData = useMemo(() => points.filter((p) => p.rank === tier), [
    tier,
    points,
  ]);

  return (
    <Box ref={graphRef} minH="300px" w="full">
      <Graph
        id={`t${tier}`}
        startDate={event.startdate}
        endDate={event?.enddate}
        width={width}
        height={height}
        points={graphData}
        isSmall
      />
    </Box>
  );
};

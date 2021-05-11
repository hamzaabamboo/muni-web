import { Flex, Stack, Text } from "@chakra-ui/react";
import { getWeirdEventType } from "api/utils";
import { filter, sum, max } from "d3";
import { useLocalStorage } from "hooks/useLocalstorage";
import React, { useContext, useMemo, useRef } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphDisplayContext } from "src/contexts/GraphDisplayContext";
import { mapPointsToChanges } from "utils/mapPoints";
import { useSize } from "web-api-hooks";
import { ChangesTable } from "./ChangesTable";
import { Graph, GraphFlags } from "./Graph";
import { GraphOptions } from "./GraphOptions";
import { PlayerGraph } from "./PlayerGraph";

export const PlayerDetails = () => {
  const { points, playerFilters } = useContext(GraphDisplayContext);
  const [graphFlags, setGraphFlags] = useLocalStorage<GraphFlags>(
    "graphFlags",
    {
      showTooltip: false,
      advancedZoom: false,
    }
  );
  const { event } = useContext(EventContext);
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

  const maxPts = useMemo(() => {
    return points ? max(points, (p) => p.points) : 0;
  }, [points]);

  const totalBurned = useMemo(() => {
    return points
      ? sum(
          filter(points, (p) => p.difference < -3200),
          (p) => -1 * p.difference
        )
      : 0;
  }, [points]);
  return (
    <Stack>
      <Flex direction={["column", null, "row"]} alignItems="stretch">
        <Flex flexDirection="column" flex={1}>
          <GraphOptions graphFlags={graphFlags} setGraphFlags={setGraphFlags} />
          <Flex
            flexDirection="column"
            ref={graphRef}
            maxH="500"
            minH="300"
            flex={1}
          >
            {playerFilters.length > 0 && (
              <Graph
                id={"player"}
                width={width}
                height={height}
                points={points?.map((p) => ({ ...p, rank: undefined }))}
                graphFlags={graphFlags}
                startDate={event?.startdate}
                endDate={event?.enddate}
              />
            )}
          </Flex>
        </Flex>
        <Flex>
          <ChangesTable pastUpdates={points?.map(mapPointsToChanges)} />
        </Flex>
      </Flex>
      {getWeirdEventType(event) === "Medley" && (
        <Stack>
          <Text>Current EP: {maxPts} </Text>
          <Text>Total Burned: {totalBurned} </Text>
        </Stack>
      )}
    </Stack>
  );
};

import React, { useContext, useMemo, useRef, useState } from "react";

import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { useSize } from "web-api-hooks";
import { ScoreGraph } from "components/ScoreGraph";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { useLocalStorage } from "hooks/useLocalstorage";
import { GraphOptions } from "components/GraphOptions";
import { GraphFlags } from "components/Graph";

export default function GraphPage() {
  const { lastUpdated } = useContext(LeaderboardContext);

  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [graphFlags, setGraphFlags] = useLocalStorage<GraphFlags>(
    "graphFlags",
    {
      showTooltip: false,
      advancedZoom: false,
    }
  );

  const lastUpdatedText = useMemo(() => {
    const ms = DateTime.fromJSDate(lastUpdated).diffNow().as("milliseconds");
    if (ms === 0) return "Just now";
    return (
      humanize(ms, {
        round: true,
        largest: 2,
      }) + " ago"
    );
  }, [lastUpdated]);

  return (
    <>
      <EventInfo />
      <Navigation />
      <Text textAlign="center">Last Updated: {lastUpdatedText}</Text>
      <GraphOptions graphFlags={graphFlags} setGraphFlags={setGraphFlags} />
      <GraphDisplayProvider>
        <Box ref={graphRef} w={"full"} h="600px">
          <ScoreGraph graphFlags={graphFlags} width={width} height={height} />
        </Box>
        <TierSelector />
      </GraphDisplayProvider>
    </>
  );
}

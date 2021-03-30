import React, { useContext, useMemo, useRef } from "react";

import { Box, Text } from "@chakra-ui/react";
import { Graph } from "components/Graph";
import { EventInfo } from "components/EventInfo";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { useSize } from "web-api-hooks";

export default function GraphPage() {
  const { lastUpdated } = useContext(LeaderboardContext);

  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

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
      <Text color="red.600" fontStyle="italic" textAlign="center">
        This is super experimental, muni may break
      </Text>
      <Text textAlign="center">Last Updated: {lastUpdatedText}</Text>
      <Box ref={graphRef} w={"full"} h="600px">
        <Graph width={width} height={height} />
      </Box>
      <TierSelector />
    </>
  );
}

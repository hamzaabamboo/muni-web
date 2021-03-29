import React, { useContext, useMemo } from "react";

import { Text } from "@chakra-ui/react";
import { Graph } from "components/Graph";
import { EventInfo } from "components/EventInfo";
import { GraphProvider } from "src/contexts/GraphContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";

export default function Home() {
  const { lastUpdated } = useContext(LeaderboardContext);

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
    <GraphProvider>
      <EventInfo />
      <Text color="red.600"> This is super experimental, muni will break</Text>
      <Text>Last Updated: {lastUpdatedText}</Text>
      <Graph />
    </GraphProvider>
  );
}

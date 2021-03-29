import React, { useContext, useMemo } from "react";

import { Text } from "@chakra-ui/react";
import { Graph } from "components/Graph";
import { EventInfo } from "components/EventInfo";
import { GraphProvider } from "src/contexts/GraphContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";

export default function GraphPage() {
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
      <Navigation />
      <Text color="red.600" fontStyle="italic">
        {" "}
        This is super experimental, muni may break
      </Text>
      <Text>Last Updated: {lastUpdatedText}</Text>
      <Graph />
      <TierSelector />
    </GraphProvider>
  );
}

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

export default function GraphPage() {
  const { lastUpdated } = useContext(LeaderboardContext);

  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [showTooltip, setShowTooltip] = useLocalStorage<boolean>(
    "showTooltip",
    false
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
      <Flex alignItems="center">
        <Switch
          isChecked={showTooltip}
          onChange={(c) => setShowTooltip(c.target.checked)}
        />
        <Text ml={2}>
          Show Details on hover
          <Text
            ml={1}
            as="span"
            color="red.600"
            fontStyle="italic"
            textAlign="center"
          >
            (This is super experimental, muni may break)
          </Text>
        </Text>
      </Flex>
      <GraphDisplayProvider>
        <Box ref={graphRef} w={"full"} h="600px">
          <ScoreGraph showTooltip={showTooltip} width={width} height={height} />
        </Box>
        <TierSelector />
      </GraphDisplayProvider>
    </>
  );
}

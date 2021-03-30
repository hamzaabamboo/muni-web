import React, { useContext, useMemo, useRef } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Graph } from "components/Graph";
import { EventInfo } from "components/EventInfo";
import { GraphProvider } from "src/contexts/GraphContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { useSize } from "web-api-hooks";
import { Leaderboard } from "components/Leaderboard";

export default function LivePage() {
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

  return (
    <GraphProvider>
      <Flex flexDir="column" h="full">
        <EventInfo />
        <Navigation />
        <Flex
          flex="1"
          w="full"
          flexDirection={["column", null, "row"]}
          minH="500px"
        >
          <Box w={"full"} px="8" order={[2, null, 1]} flex="1">
            <Leaderboard isSmall />
          </Box>
          <Box w="full" order={[1, null, 2]} flex="1">
            <Box ref={graphRef} h="80%" maxH="600px">
              <Graph width={width} height={height} isSmall isLive />
            </Box>
            <TierSelector />
          </Box>
        </Flex>
      </Flex>
    </GraphProvider>
  );
}

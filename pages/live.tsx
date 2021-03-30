import React, { useRef } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { Graph } from "components/Graph";
import { EventInfo } from "components/EventInfo";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { useSize } from "web-api-hooks";
import { Leaderboard } from "components/Leaderboard";

export default function LivePage() {
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);

  return (
    <Flex flexDir="column" h="full" px={2}>
      <EventInfo />
      <Navigation />
      <Flex
        flex="1"
        w="full"
        flexDirection={["column", null, "row"]}
        minH="500px"
      >
        <Box flex="1">
          <Box ref={graphRef} h="full" minH="400px" maxH="600px">
            <Graph width={width} height={height} isSmall isLive />
          </Box>
          <TierSelector />
        </Box>
        <Box px="8" flex="1">
          <Leaderboard isSmall />
        </Box>
      </Flex>
    </Flex>
  );
}

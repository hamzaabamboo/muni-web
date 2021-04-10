import React, { useRef, useState } from "react";

import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { useSize } from "web-api-hooks";
import { Leaderboard } from "components/Leaderboard";
import { ScoreGraph } from "components/ScoreGraph";
import { RankDetailModal } from "components/RankDetailModal";
import { Tier } from "types/Leaderboard";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { useLocalStorage } from "hooks/useLocalstorage";
import { GraphOptions } from "components/GraphOptions";
import { GraphFlags } from "components/Graph";
import { AnalysisProvider } from "src/contexts/AnalysisContext";

export default function LivePage() {
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [currentTier, setCurrentTier] = useState<Tier>();
  const [graphFlags, setGraphFlags] = useLocalStorage<GraphFlags>(
    "graphFlags",
    {
      showTooltip: false,
      advancedZoom: false,
    }
  );

  return (
    <Flex flexDir="column" h="full" px={2}>
      <EventInfo />
      <Navigation />
      <Flex
        flex="1"
        w="full"
        flexDirection={["column", null, "row"]}
        alignItems="stretch"
        minH="500px"
      >
        <Box flex="1">
          <GraphDisplayProvider>
            <Box ref={graphRef} h="full" minH="400px" maxH="600px">
              <ScoreGraph
                width={width}
                height={height}
                isSmall
                isLive
                graphFlags={graphFlags}
              />
            </Box>
            <GraphOptions
              graphFlags={graphFlags}
              setGraphFlags={setGraphFlags}
            />
            <TierSelector />
          </GraphDisplayProvider>
        </Box>
        <Box px="8">
          <Leaderboard isSmall onTierSelected={(t) => setCurrentTier(t)} />
          <AnalysisProvider>
            <GraphDisplayProvider>
              <RankDetailModal
                tier={currentTier}
                onClose={() => setCurrentTier(undefined)}
              />
            </GraphDisplayProvider>
          </AnalysisProvider>
        </Box>
      </Flex>
    </Flex>
  );
}

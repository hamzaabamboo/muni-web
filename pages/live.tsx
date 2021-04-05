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

export default function LivePage() {
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [currentTier, setCurrentTier] = useState<Tier>();
  const [showTooltip, setShowTooltip] = useLocalStorage<boolean>(
    "showTooltip",
    false
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
                showTooltip={showTooltip}
              />
            </Box>
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
            <TierSelector />
          </GraphDisplayProvider>
        </Box>
        <Box px="8">
          <Leaderboard isSmall onTierSelected={(t) => setCurrentTier(t)} />
          <GraphDisplayProvider>
            <RankDetailModal
              tier={currentTier}
              onClose={() => setCurrentTier(undefined)}
            />
          </GraphDisplayProvider>
        </Box>
      </Flex>
    </Flex>
  );
}

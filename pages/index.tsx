import React, { useState } from "react";
import Link from "next/link";

import { Leaderboard } from "components/Leaderboard";
import { Box } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { Navigation } from "components/Navigation";
import { RankDetailModal } from "components/RankDetailModal";
import { Tier } from "types/Leaderboard";
import { GraphProvider } from "src/contexts/GraphContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";

export default function Home() {
  const [currentTier, setCurrentTier] = useState<Tier>();

  const showTierDetail = (tier: Tier) => {
    setCurrentTier(tier);
  };

  const handleCloseModal = () => {
    setCurrentTier(undefined);
  };
  return (
    <>
      <EventInfo />
      <Navigation />
      <Box px={2} w="full">
        <Leaderboard onTierSelected={showTierDetail} />
        <GraphDisplayProvider>
          {currentTier && (
            <RankDetailModal tier={currentTier} onClose={handleCloseModal} />
          )}
        </GraphDisplayProvider>
      </Box>
    </>
  );
}

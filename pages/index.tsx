import { Box } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { Leaderboard } from "components/Leaderboard";
import { Navigation } from "components/Navigation";
import { RankDetailModal } from "components/RankDetailModal";
import { DateTime } from "luxon";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { EventContext } from "src/contexts/EventContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { Tier } from "types/Leaderboard";
import { getAbsolutePath } from "utils/assets";

export default function Home() {
  const [currentTier, setCurrentTier] = useState<Tier>();
  const { event } = useContext(EventContext);

  useEffect(() => {
    if (
      event &&
      DateTime.fromISO(event.enddate).diffNow("seconds").seconds < 0
    ) {
      router.push(getAbsolutePath("/towaland"));
    }
  }, [event]);

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
        <AnalysisProvider>
          <GraphDisplayProvider>
            {currentTier && (
              <RankDetailModal tier={currentTier} onClose={handleCloseModal} />
            )}
          </GraphDisplayProvider>
        </AnalysisProvider>
      </Box>
    </>
  );
}

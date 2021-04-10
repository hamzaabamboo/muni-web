import React, { useContext, useMemo, useRef, useState } from "react";

import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { DateTime } from "luxon";
import humanize from "humanize-duration";
import { TierSelector } from "components/TierSelector";
import { Navigation } from "components/Navigation";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { useLocalStorage } from "hooks/useLocalstorage";
import { GraphOptions } from "components/GraphOptions";
import { GraphFlags } from "components/Graph";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { RateGraph } from "components/RateGraph";
import { AnalysisOptions } from "components/AnalysisOptions";

export default function AnalyzePage() {
  const { lastUpdated } = useContext(LeaderboardContext);
  const [graphFlags, setGraphFlags] = useLocalStorage<GraphFlags>(
    "graphFlags",
    {
      showTooltip: false,
      advancedZoom: false,
    }
  );

  return (
    <>
      <EventInfo />
      <Navigation />
      <GraphDisplayProvider>
        <AnalysisProvider>
          <RateGraph graphFlags={graphFlags} />
          <AnalysisOptions />
        </AnalysisProvider>
        <GraphOptions graphFlags={graphFlags} setGraphFlags={setGraphFlags} />
        <TierSelector />
      </GraphDisplayProvider>
    </>
  );
}

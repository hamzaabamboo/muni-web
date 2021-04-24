import { AnalysisOptions } from "components/AnalysisOptions";
import { EventInfo } from "components/EventInfo";
import { GraphFlags } from "components/Graph";
import { GraphOptions } from "components/GraphOptions";
import { Navigation } from "components/Navigation";
import { RateGraph } from "components/RateGraph";
import { TierSelector } from "components/TierSelector";
import { useLocalStorage } from "hooks/useLocalstorage";
import React, { useContext } from "react";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";

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

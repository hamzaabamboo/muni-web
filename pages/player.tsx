import { EventInfo } from "components/EventInfo";
import { Navigation } from "components/Navigation";
import { PlayerDetails } from "components/PlayerDetails";
import { PlayerSearch } from "components/PlayerSearch";
import React from "react";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";

export default function PlayerSearchPage() {
  return (
    <>
      <EventInfo />
      <Navigation />
      <GraphDisplayProvider>
        <PlayerSearch />
        <PlayerDetails />
      </GraphDisplayProvider>
    </>
  );
}

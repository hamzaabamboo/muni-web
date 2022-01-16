import { Box } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { MiniLeaderboard } from "components/MiniLeaderboard";
import { MiniLeaderboardPicker } from "components/MiniLeaderboardPicker";
import { Navigation } from "components/Navigation";
import { DateTime } from "luxon";
import router from "next/router";
import React, { useContext, useEffect } from "react";
import { EventContext } from "src/contexts/EventContext";
import { MiniLeaderboardProvider } from "src/contexts/MiniLeaderboardContext";

export default function Home() {
  const { event } = useContext(EventContext);

  return (
    <>
      <EventInfo />
      <Navigation />
      <Box px={2} w="full">
        <MiniLeaderboardProvider>
          <MiniLeaderboardPicker />
          <MiniLeaderboard />
        </MiniLeaderboardProvider>
      </Box>
    </>
  );
}

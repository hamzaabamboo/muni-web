import React from "react";
import Link from "next/link";

import { Leaderboard } from "components/Leaderboard";
import { Box, Flex, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { Navigation } from "components/Navigation";

export default function Home() {
  return (
    <>
      <EventInfo />
      <Navigation />
      <Box px={2} maxW={["100%", null, "80%"]} mx="auto">
        <Leaderboard interval={10000} />
      </Box>
    </>
  );
}

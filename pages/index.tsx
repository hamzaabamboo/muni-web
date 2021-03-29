import React from "react";
import Link from "next/link";

import { Leaderboard } from "components/Leaderboard";
import { Flex, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";
import { Navigation } from "components/Navigation";

export default function Home() {
  return (
    <>
      <EventInfo />
      <Navigation />
      <Leaderboard interval={10000} />
    </>
  );
}

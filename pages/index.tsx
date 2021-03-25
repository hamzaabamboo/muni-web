import React from "react";
import Link from "next/link";

import { Leaderboard } from "components/Leaderboard";
import { Flex, Text } from "@chakra-ui/react";
import { EventInfo } from "components/EventInfo";

export default function Home() {
  return (
    <>
      <Flex flexDirection="column" w="full" minH="100vh" alignItems="center">
        <Flex
          as="main"
          flexDirection="column"
          alignItems="center"
          flex={1}
          maxW={["100%", "90%"]}
        >
          <EventInfo />
          <Leaderboard interval={10000} />
        </Flex>
        <Flex as="footer" py="20px">
          Powered by{" "}
          <Link href="https://www.youtube.com/watch?v=M2wZs7eHHVo">
            <Text as="span" color="blue.500" cursor="pointer" ml="2">
              むに
            </Text>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

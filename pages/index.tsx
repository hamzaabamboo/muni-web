import React from "react";
import Link from "next/link";

import { Leaderboard } from "src/components/Leaderboard";
import { Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <main>
        <Text fontSize="3xl" fontWeight="bold">
          Welcome to Muniboard
        </Text>
      </main>
      <Leaderboard interval={10000} />
      <footer>
        Powered by{" "}
        <Link href="https://www.youtube.com/watch?v=M2wZs7eHHVo">むに</Link>
      </footer>
    </>
  );
}

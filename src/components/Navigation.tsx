import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const paths = [
  {
    label: "Muniboard",
    url: "/",
  },
  {
    label: "Player (Beta :kek:)",
    url: "/player",
  },
  {
    label: "Graph",
    url: "/graph",
  },
  {
    label: "Analyze",
    url: "/analyze",
  },
  {
    label: "Live",
    url: "/live",
  },
];
export const Navigation = () => {
  const router = useRouter();
  return (
    <Flex py={2} mb={2} justifyContent={["center", "start"]} flexWrap="wrap">
      {paths.map((p) => (
        <Button
          mx={2}
          p={2}
          rounded="md"
          colorScheme="blue"
          variant={router.pathname === p.url ? "solid" : "outline"}
          fontSize="lg"
          key={p.url}
        >
          <Link href={p.url}>{p.label}</Link>
        </Button>
      ))}
    </Flex>
  );
};

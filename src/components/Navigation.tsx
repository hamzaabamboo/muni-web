import { Box, Flex } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navigation = () => {
  const router = useRouter();
  return (
    <Flex p={2} justifyContent="center">
      <Box
        mx={4}
        p={2}
        rounded="md"
        bg={router.pathname === "/" ? "gray.200" : "transparent"}
        color={router.pathname === "/" ? "blue.400" : "black"}
        fontSize="lg"
      >
        <Link href="/">Muniboard</Link>
      </Box>
      <Box
        mx={4}
        p={2}
        rounded="md"
        bg={router.pathname === "/graph" ? "gray.200" : "transparent"}
        color={router.pathname === "/graph" ? "blue.400" : "black"}
        fontSize="lg"
      >
        <Link href="/graph">Graph</Link>
      </Box>
      <Box
        mx={4}
        p={2}
        rounded="md"
        bg={router.pathname === "/live" ? "gray.200" : "transparent"}
        color={router.pathname === "/live" ? "blue.400" : "black"}
        fontSize="lg"
      >
        <Link href="/live">Live View</Link>
      </Box>
    </Flex>
  );
};

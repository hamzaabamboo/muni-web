import Head from "next/head";
import React from "react";

import {
  Box,
  ChakraProvider,
  Flex,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { EventProvider } from "src/contexts/EventContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { GraphProvider } from "src/contexts/GraphContext";
import { ComposeProviders } from "src/contexts/ComposeProviders";
import { LeaderboardChangesProvider } from "src/contexts/LeaderboardChangesContext";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";
function MyApp({ Component, pageProps }) {
  const { isEventPage } = pageProps;

  const content = (
    <Flex flexDirection="column" w="full" minH="100vh" alignItems="stretch">
      <Flex
        as="main"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="stretch"
        flex={1}
        mb={20}
      >
        <Flex justifyContent="center" w="full" bg="gray.100">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w={["100%", null, "90%"]}
            py={4}
            bg="gray.100"
          >
            <Link href={`${base}/`} as="a" _hover={{ textDecor: "none" }}>
              <Text fontSize="2xl" fontWeight="bold">
                <Text as="span" textDecor="line-through" color="red.400">
                  Muni
                </Text>{" "}
                Towa Web (Please give me a proper name)
              </Text>
            </Link>
            <Link href={`${base}/event`} _hover={{ textDecor: "none" }} as="a">
              <Text fontSize="lg">View all events</Text>
            </Link>
          </Flex>
        </Flex>
        <Box maxW={["100%", null, "90%"]} w="full" mx="auto">
          <Component {...pageProps} />
        </Box>
      </Flex>
      <Flex as="footer" py="20px" justifyContent="center" bg="gray.100">
        Powered by{" "}
        <Link href="https://www.youtube.com/watch?v=M2wZs7eHHVo">
          <Text as="span" color="blue.500" cursor="pointer" ml="2">
            むに
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
  return (
    <>
      <Head>
        <title>Create むに App</title>
        <link rel="icon" href={`${base}/favicon.ico`} />
        {!isEventPage && (
          <>
            <meta property="og:title" content="Muni Web" />
            <meta
              property="og:url"
              content="https://hamzaabamboo.github.io/muni-web"
            />
            <meta
              property="og:image"
              content={`${base}/images/munihappy.png`}
            />
            <meta property="og:description" content="Munimunimunimunimuni" />
          </>
        )}
      </Head>
      <ChakraProvider>
        {!isEventPage ? (
          <ComposeProviders
            providers={[
              LeaderboardProvider,
              EventProvider,
              GraphProvider,
              LeaderboardChangesProvider,
            ]}
          >
            {content}
          </ComposeProviders>
        ) : (
          <>{content}</>
        )}
      </ChakraProvider>
    </>
  );
}

export default MyApp;

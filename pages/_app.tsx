import Head from "next/head";
import React from "react";

import { Box, ChakraProvider, Flex, Link, Text } from "@chakra-ui/react";
import { EventProvider } from "src/contexts/EventContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { GraphProvider } from "src/contexts/GraphContext";
import { ComposeProviders } from "src/contexts/ComposeProviders";
import { LeaderboardChangesProvider } from "src/contexts/LeaderboardChangesContext";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create むに App</title>
        <link rel="icon" href={`${base}/favicon.ico`} />
        <meta property="og:title" content="Muni Web" />
        <meta
          property="og:url"
          content="https://hamzaabamboo.github.io/muni-web"
        />
        <meta property="og:image" content={`${base}/images/munihappy.png`} />
        <meta property="og:description" content="Munimunimunimunimuni" />
      </Head>
      <ChakraProvider>
        <ComposeProviders
          providers={[
            LeaderboardProvider,
            EventProvider,
            GraphProvider,
            LeaderboardChangesProvider,
          ]}
        >
          <Flex
            flexDirection="column"
            w="full"
            minH="100vh"
            alignItems="stretch"
          >
            <Flex
              as="main"
              flexDirection="column"
              alignItems="stretch"
              justifyContent="stretch"
              flex={1}
            >
              <Box maxW={["100%", null, "90%"]} w="full" mx="auto">
                <Component {...pageProps} />
              </Box>
            </Flex>
            <Flex as="footer" py="20px" justifyContent="center">
              Powered by{" "}
              <Link href="https://www.youtube.com/watch?v=M2wZs7eHHVo">
                <Text as="span" color="blue.500" cursor="pointer" ml="2">
                  むに
                </Text>
              </Link>
            </Flex>
          </Flex>
        </ComposeProviders>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

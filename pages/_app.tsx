import Head from "next/head";
import React from "react";

import { ChakraProvider, Flex, Link, Text } from "@chakra-ui/react";
import { EventProvider } from "src/contexts/EventContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";

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
        <LeaderboardProvider>
          <EventProvider>
            <Flex
              flexDirection="column"
              w="full"
              minH="100vh"
              alignItems="center"
            >
              <Flex
                as="main"
                flexDirection="column"
                alignItems="center"
                flex={1}
                maxW={["100%", "90%"]}
              >
                <Component {...pageProps} />
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
          </EventProvider>
        </LeaderboardProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

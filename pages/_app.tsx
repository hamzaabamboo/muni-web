import Head from "next/head";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create むに App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

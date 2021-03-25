import Head from "next/head";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

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
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

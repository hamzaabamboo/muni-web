import Head from "next/head";
import React from "react";
import {} from "next/image";

import { ChakraProvider } from "@chakra-ui/react";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";
function MyApp({ Component, pageProps }) {
  console.log(process.env);
  return (
    <>
      <Head>
        <title>Create むに App</title>
        <link rel="icon" href={`${base}/favicon.ico`} />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

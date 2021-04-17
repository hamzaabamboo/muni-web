import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "components/Layout";
import Head from "next/head";
import React from "react";
import { ComposeProviders } from "src/contexts/ComposeProviders";
import { EventProvider } from "src/contexts/EventContext";
import { GraphProvider } from "src/contexts/GraphContext";
import { LeaderboardChangesProvider } from "src/contexts/LeaderboardChangesContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { ThemeProvider } from "src/contexts/ThemeContext";
import theme from "src/theme";
import { PageProps } from "types/PageProps";
import { getAbsolutePath } from "utils/assets";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC<PageProps>;
  pageProps: PageProps;
}) {
  const { isStatic, head, backgroundImage } = pageProps;
  const { title, image, description, url } = head || {};

  return (
    <>
      <Head>
        <title>{title || "Create むに App"}</title>
        <link rel="icon" href={getAbsolutePath("/favicon.ico")} />
        <meta property="og:title" content={title || "Create むに App"} />
        <meta
          property="og:url"
          content={url || "https://hamzaabamboo.github.io/muni-web"}
        />
        <meta
          property="og:image"
          content={image || getAbsolutePath("/images/munihappy.png")}
        />
        <meta
          property="og:description"
          content={description || "Munimunimunimunimuni"}
        />
      </Head>
      <ThemeProvider defaultImage={backgroundImage}>
        <ChakraProvider theme={theme}>
          {!isStatic ? (
            <ComposeProviders
              providers={[
                EventProvider,
                LeaderboardProvider,
                GraphProvider,
                LeaderboardChangesProvider,
              ]}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ComposeProviders>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

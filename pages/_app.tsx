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
import { Fonts } from "src/theme/Fonts";
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
        <meta property="og:type" content={"website"} />
        <meta property="og:title" content={title || "Create むに App"} />
        <meta property="og:site_name" content={"Create むに App"} />
        <meta
          property="og:url"
          content={url || "https://hamzaabamboo.github.io/muni-web"}
        />
        {typeof image === "string" || !image ? (
          <meta
            property="og:image"
            content={
              (image as string) || getAbsolutePath("/images/munihappy.png")
            }
          />
        ) : (
          image.map((i, idx) => {
            return <meta key={idx} property="og:image" content={i} />;
          })
        )}
        <meta
          property="og:description"
          content={description || "Munimunimunimunimuni"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HamP_punipuni" />
        <meta
          name="twitter:image:src"
          content={
            (typeof image === "string" ? image : image?.[0]) ||
            getAbsolutePath("/images/munihappy.png")
          }
        />
        <meta name="twitter:title" content={title || "Create むに App"} />
        <meta
          name="twitter:description"
          content={description || "Munimunimunimunimuni"}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-30SD4N2YY8"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-30SD4N2YY8')
          `,
          }}
        />
      </Head>
      <ThemeProvider defaultImage={backgroundImage}>
        <ChakraProvider theme={theme}>
          <Fonts />
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

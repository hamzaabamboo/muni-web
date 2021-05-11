import { Flex, Box, useColorMode } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { ThemeContext } from "src/contexts/ThemeContext";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";

export const Layout: FC = ({ children }) => {
  const { bgImage } = useContext(ThemeContext);
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDirection="column"
      w="full"
      minH="100vh"
      alignItems="stretch"
      backgroundImage={
        bgImage &&
        `${
          colorMode === "light"
            ? "linear-gradient(to bottom, rgba(255,255, 255, .85), rgba(255,255, 255, .85))"
            : "linear-gradient(to bottom, rgba(0,0, 0, .75), rgba(0,0, 0, .75))"
        }, url(${bgImage})`
      }
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      backgroundBlendMode={colorMode === "light" ? "lighten" : "darken"}
    >
      <Flex
        as="main"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="stretch"
        flex={1}
      >
        <Flex justifyContent="center" w="full">
          <TopBar />
        </Flex>
        <Flex
          maxW={["100%", null, "90%"]}
          flexDirection="column"
          flex="1"
          w="full"
          px={4}
          mx="auto"
        >
          {children}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

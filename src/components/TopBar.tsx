import {
  Flex,
  Text,
  Switch,
  useColorMode,
  Link,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useBGColor } from "src/theme/hooks";
import { getAbsolutePath } from "utils/assets";

export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useBGColor();
  return (
    <Box w={"100%"} bg={bg}>
      <Flex
        justifyContent="space-between"
        alignItems={["stretch", null, "center"]}
        flexDirection={["column", null, "row"]}
        w={["100%", null, "90%"]}
        m={"0 auto"}
        py={4}
      >
        <Link href={getAbsolutePath("/")} as="a" _hover={{ textDecor: "none" }}>
          <Text
            textAlign={["center", null, "start"]}
            fontSize="2xl"
            fontWeight="bold"
          >
            <Text as="span" textDecor="line-through" color="red.400">
              Muni
            </Text>{" "}
            Towa Web (Please give me a proper name)
          </Text>
        </Link>
        <Flex
          alignItems="center"
          justifyContent={["space-between", null, "unset"]}
          px={2}
        >
          <Text mx={2}>
            Dark Mode
            <Switch
              mx={2}
              isChecked={colorMode === "dark"}
              onChange={() => toggleColorMode?.()}
            ></Switch>
          </Text>
          <Link
            href={getAbsolutePath("/event")}
            _hover={{ textDecor: "none" }}
            as="a"
          >
            <Text fontSize="lg">View all events</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

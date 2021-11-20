import {
  Flex,
  Text,
  Switch,
  useColorMode,
  Link,
  useColorModeValue,
  Box,
  HStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ServerContext } from "src/contexts/ServerProvider";
import { useBGColor } from "src/theme/hooks";
import { getAbsolutePath } from "utils/assets";

export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useBGColor();
  const { server } = useContext(ServerContext);

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
            px={2}
          >
            {server === "en" ? (
              <>Towa Web EN</>
            ) : (
              <>
                <Text as="span" textDecor="line-through" color="red.400">
                  Muni
                </Text>{" "}
                Towa Web (Please give me a proper name)
              </>
            )}
          </Text>
        </Link>
        <HStack
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
          {server === "en" ? (
            <>
              <Link
                href={getAbsolutePath("/")}
                _hover={{ textDecor: "none" }}
                as="a"
              >
                <Text fontSize="lg">Back to JP</Text>
              </Link>
            </>
          ) : (
            <>
              <Link
                href={getAbsolutePath("/event")}
                _hover={{ textDecor: "none" }}
                as="a"
              >
                <Text fontSize="lg">View all events</Text>
              </Link>
              <Link
                href={getAbsolutePath("/en/")}
                _hover={{ textDecor: "none" }}
                as="a"
              >
                <Text fontSize="lg">EN</Text>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

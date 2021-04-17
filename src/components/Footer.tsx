import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useBGColor } from "src/theme/hooks";

export const Footer = () => {
  const bg = useBGColor();
  return (
    <Flex as="footer" py="20px" justifyContent="center" bg={bg}>
      Powered by{" "}
      <Link href="https://www.youtube.com/watch?v=M2wZs7eHHVo">
        <Text as="span" colorScheme="blue" cursor="pointer" mx="2">
          むに
        </Text>
      </Link>{" "}
      | If stuff breaks, just refresh or contact someone
    </Flex>
  );
};

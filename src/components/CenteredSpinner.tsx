import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

export const CenteredSpinner = () => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center" h="full">
      <Spinner size="xl" />
    </Flex>
  );
};

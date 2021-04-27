import { Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { getAbsolutePath } from "utils/assets";

const TowaLandDynamic = dynamic(() => import("components/TowaLand"), {
  ssr: false,
});
const TowaLandPage = () => {
  return (
    <Flex
      flexDirection="column"
      flex={1}
      h="full"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Flex flexDirection="column" alignItems="center" py="4">
        <Text fontSize="3xl" fontWeight="bold">
          Welcome to Towa land
        </Text>
        <Text fontSize="lg" textAlign="center">
          No ongoing event right now, but you can look at Towa and Muni
          discussing about the next event.{" "}
        </Text>
        <Text fontSize="lg">
          While you wait, you can also browse old events too!{" "}
          <Link href={getAbsolutePath("/event")}>
            <Text
              as="span"
              fontStyle="underline"
              cursor="pointer"
              color="blue.200"
            >
              here
            </Text>
          </Link>
        </Text>
        <Text fontSize="lg">
          If there is an event, just go back to home page{" "}
          <Link href={getAbsolutePath("/")}>
            <Text
              as="span"
              fontStyle="underline"
              cursor="pointer"
              color="blue.200"
            >
              here
            </Text>
          </Link>
        </Text>
      </Flex>
      <Flex flex={1} alignItems="stretch" justifyContent="stretch">
        <TowaLandDynamic />
      </Flex>
    </Flex>
  );
};

export default TowaLandPage;

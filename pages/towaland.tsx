import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const TowaLandDynamic = dynamic(() => import("components/TowaLand"), {
  ssr: false,
});
const TowaLandPage = () => {
  return (
    <Flex justifyContent="stretch" alignItems="stretch">
      <TowaLandDynamic />
    </Flex>
  );
};

export default TowaLandPage;

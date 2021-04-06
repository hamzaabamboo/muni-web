import { Flex, Switch, Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { GraphFlags } from "./Graph";

export const GraphOptions: FC<{
  graphFlags: GraphFlags;
  setGraphFlags: Dispatch<SetStateAction<GraphFlags>>;
}> = ({ graphFlags, setGraphFlags }) => {
  const toggleGraphOptions = (key: keyof GraphFlags) => {
    setGraphFlags((d) => ({ ...d, [key]: !d[key] }));
  };
  return (
    <Flex flexDir="column">
      <Text
        ml={1}
        as="span"
        color="red.600"
        fontStyle="italic"
        textAlign="center"
      >
        (These settings are experimental, muni may break or becomes very slow)
      </Text>
      <Flex flexDir="column">
        <Flex>
          <Switch
            isChecked={graphFlags.showTooltip}
            onChange={() => toggleGraphOptions("showTooltip")}
          />
          <Text ml={2}>Show Details on hover</Text>
        </Flex>
        <Flex>
          <Switch
            isChecked={graphFlags.advancedZoom}
            onChange={() => toggleGraphOptions("advancedZoom")}
          />
          <Text ml={2}>Advanced Zoom</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

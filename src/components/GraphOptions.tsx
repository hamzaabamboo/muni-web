import { Flex, Switch, Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { GraphFlags } from "./Graph";

export const GraphOptions: FC<{
  graphFlags: GraphFlags;
  setGraphFlags: Dispatch<SetStateAction<GraphFlags>>;
  forecastOptions?: boolean;
}> = ({ graphFlags, setGraphFlags, forecastOptions = false }) => {
  const toggleGraphOptions = (key: keyof GraphFlags) => {
    setGraphFlags((d) => ({ ...d, [key]: !d[key] }));
  };
  return (
    <Flex flexDir="column">
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
        {forecastOptions && (
          <Flex>
            <Switch
              isChecked={graphFlags.showForecast}
              onChange={() => toggleGraphOptions("showForecast")}
            />
            <Text ml={2}>Show Forecast (Muni may break, as usual)</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

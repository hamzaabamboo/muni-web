import { Flex, Select, Switch, Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { AnalysisContext } from "src/contexts/AnalysisContext";

const intervals = [
  {
    label: "1 Minute (Laggy tho)",
    value: 60000,
  },

  {
    label: "10 Minutes",
    value: 600000,
  },
  {
    label: "30 minutes",
    value: 1800000,
  },

  {
    label: "1 Hour",
    value: 3600000,
  },

  {
    label: "1 Day",
    value: 86400000,
  },
];
export const AnalysisOptions = () => {
  const { interval, setInterval } = useContext(AnalysisContext);
  return (
    <Flex flexDir="column">
      <Text my={1} fontWeight="bold" as="span" textAlign="start">
        Analysis Settings
      </Text>
      <Flex flexDir="row" alignItems="center">
        <Text mr={2}>Interval</Text>
        <Select
          value={interval}
          onChange={(v) => setInterval(Number(v.target.value))}
        >
          {intervals.map((i) => (
            <option value={i.value} key={i.value}>
              {i.label}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

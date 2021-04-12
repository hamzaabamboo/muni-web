import { Flex, Td, Text, Th, Tr, useBreakpoint } from "@chakra-ui/react";
import { Table, Tbody, Thead } from "@chakra-ui/table";
import { tierBorders } from "constants/tierborder";
import { DateTime } from "luxon";
import React, { FC, useContext, useMemo } from "react";
import { EventContext } from "src/contexts/EventContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier as ITier } from "types/Leaderboard";
import { formatPoints } from "utils/formatPoints";
import { CenteredSpinner } from "./CenteredSpinner";
import { Tier } from "./Tier";

interface LeaderboardProps {
  interval?: number;
  isPlaying?: boolean;
  isSmall?: boolean;
  onTierSelected?: (tier: ITier) => void;
}

export const AfterEventLeaderboard: FC<LeaderboardProps> = ({
  isSmall,
  interval = 1000,
  isPlaying: showIsPlaying = true,
  onTierSelected,
}) => {
  const { lbData } = useContext(LeaderboardContext);
  const { event } = useContext(EventContext);
  const breakpoint = useBreakpoint();

  if (!lbData) return <CenteredSpinner />;

  const smallMode = isSmall || breakpoint === "base" || breakpoint === "sm";
  const hideIfSmall = smallMode && { display: "none" };

  const totalHours = useMemo(() => {
    return Math.round(
      DateTime.fromISO(event.enddate)
        .diff(DateTime.fromISO(event.startdate))
        .as("hours")
    );
  }, [event]);

  return (
    <Flex flexDir="column" w="full">
      <Flex flexDir="column">
        <Text fontSize="4xl" fontWeight="bold">
          Muniboard
        </Text>
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Rank</Th>
            <Th>Name</Th>
            <Th>Points</Th>
            <Th {...hideIfSmall}>Rate/hr</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lbData.map((entry, index, arr) => (
            <Tr
              key={entry.rank}
              borderBottom={tierBorders.includes(entry.rank) && "2px solid"}
              borderBottomColor="gray.400"
              onClick={() => onTierSelected?.(entry.rank)}
            >
              <Td textAlign="center">
                <Tier tier={entry.rank}>
                  {smallMode ? formatPoints(entry.rank) : entry.rank}
                </Tier>
              </Td>
              <Td>
                <Text
                  fontSize={smallMode ? "sm" : "md"}
                  overflow={smallMode ? "ellipsis" : "unset"}
                >
                  {entry.name}
                </Text>
                <Text fontSize="xs" {...hideIfSmall}>
                  {entry.description}
                </Text>
              </Td>
              <Td>
                <Text fontSize={smallMode ? "sm" : "md"}>{entry.points}</Text>
              </Td>
              <Td>
                <Text fontSize={smallMode ? "sm" : "md"}>
                  {Math.round(entry.points / totalHours)}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

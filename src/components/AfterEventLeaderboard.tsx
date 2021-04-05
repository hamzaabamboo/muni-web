import React, { FC, memo, useContext, useMemo } from "react";
import { LeaderboardEntry, Tier as ITier } from "types/Leaderboard";
import { Table, TableRowProps, Tbody, Thead } from "@chakra-ui/table";
import {
  Td,
  Th,
  Tr,
  Text,
  TextProps,
  Flex,
  useBreakpoint,
} from "@chakra-ui/react";
import { DateTime, Duration } from "luxon";
import { tierBorders } from "constants/tierborder";
import humanize from "humanize-duration";
import { EventType } from "types/Event";
import { EventContext } from "src/contexts/EventContext";
import { thresholds } from "constants/threshold";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { getLastUpdatedTime } from "utils/time";
import { CenteredSpinner } from "./CenteredSpinner";
import { formatPoints } from "utils/formatPoints";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { getIsPlayingStyles, getToBoatTime } from "utils/leaderboard";
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

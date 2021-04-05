import { Flex, Td, Text, Th, Tr, useBreakpoint } from "@chakra-ui/react";
import { Table, Tbody, Thead } from "@chakra-ui/table";
import { tierBorders } from "constants/tierborder";
import humanize from "humanize-duration";
import { DateTime } from "luxon";
import React, { FC, useContext, useMemo } from "react";
import { EventContext } from "src/contexts/EventContext";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier as ITier } from "types/Leaderboard";
import { formatPoints } from "utils/formatPoints";
import { getIsPlayingStyles, getToBoatTime } from "utils/leaderboard";
import { getLastUpdatedTime } from "utils/time";
import { CenteredSpinner } from "./CenteredSpinner";
import { Tier } from "./Tier";

interface LeaderboardProps {
  interval?: number;
  isPlaying?: boolean;
  isSmall?: boolean;
  onTierSelected?: (tier: ITier) => void;
}

export const Leaderboard: FC<LeaderboardProps> = ({
  isSmall,
  interval = 1000,
  isPlaying: showIsPlaying = true,
  onTierSelected,
}) => {
  const { lbData, lastUpdated } = useContext(LeaderboardContext);
  const { changes } = useContext(LeaderboardChangesContext);
  const { event } = useContext(EventContext);
  const breakpoint = useBreakpoint();
  const lastUpdatedText = useMemo(() => {
    const ms = DateTime.fromJSDate(lastUpdated).diffNow().as("milliseconds");
    if (ms === 0) return "Just now";
    return (
      humanize(ms, {
        round: true,
        largest: 2,
      }) + " ago"
    );
  }, [lastUpdated]);

  if (!lbData) return <CenteredSpinner />;

  const smallMode = isSmall || breakpoint === "base" || breakpoint === "sm";
  const hideIfSmall = smallMode && { display: "none" };
  return (
    <Flex flexDir="column">
      <Flex flexDir="column">
        <Text fontSize="2xl" fontWeight="bold">
          Muniboard
        </Text>
        <Text fontSize="sm" as="span" fontWeight="normal">
          Last Updated: {lastUpdatedText}
        </Text>
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Rank</Th>
            <Th>Name</Th>
            <Th>Points</Th>
            <Th textAlign="end" {...hideIfSmall}>
              Gap
            </Th>
            <Th textAlign="end" {...hideIfSmall}>
              Rate
            </Th>
            <Th textAlign="end" whiteSpace="break-spaces" {...hideIfSmall}>
              Time to boat
            </Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lbData.map((entry, index, arr) => (
            <Tr
              key={entry.rank}
              {...(showIsPlaying
                ? getIsPlayingStyles(entry, changes?.[entry.rank], event?.type)
                : {})}
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
                {changes?.[entry.rank] > 0 && (
                  <Text fontSize="xs">(+{changes[entry.rank] ?? 0})</Text>
                )}
              </Td>
              <Td isNumeric {...hideIfSmall}>
                {index + 1 < arr.length
                  ? entry.points - arr[index + 1]?.points
                  : 0}
              </Td>
              <Td isNumeric {...hideIfSmall}>
                {entry.rate}
              </Td>
              <Td isNumeric {...hideIfSmall}>
                {index + 1 < arr.length && !isNaN(Number(arr[index + 1]?.rate))
                  ? getToBoatTime(
                      ((entry.points - arr[index + 1]?.points) /
                        (Number(arr[index + 1]?.rate) -
                          Number(entry.rate === "???" ? 0 : entry.rate))) *
                        60 *
                        60 *
                        1000
                    )
                  : "-"}
              </Td>
              <Td>{getLastUpdatedTime(entry.date)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

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
        <Text fontSize="4xl" fontWeight="bold">
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

export const getIsPlayingStyles = (
  data: LeaderboardEntry,
  lastUpdated: number,
  eventType: EventType
) => {
  if (lastUpdated > thresholds[eventType]?.maxPerGame ?? 3000)
    return { bg: "red.100" };
  if (DateTime.fromISO(data.date).diffNow().as("minutes") < -10) return {};
  return {
    bg: "gray.100",
  };
};

const getToBoatTime = (ms: number): string => {
  if (isNaN(ms) || ms < 0) return "--:--";
  return Duration.fromMillis(ms).toFormat("hh:mm");
};
const Tier: React.FC<{ tier: ITier }> = memo(({ tier, children }) => {
  const styles: Partial<TextProps> = useMemo(() => {
    switch (tier) {
      case 1:
        return { fontSize: "xl", fontWeight: "bold", color: "yellow.400" };
      case 2:
        return { fontSize: "xl", fontWeight: "bold", color: "gray.400" };
      case 3:
        return { fontSize: "xl", fontWeight: "bold", color: "red.800" };
      case 10:
      case 50:
      case 100:
      case 500:
      case 1000:
      case 2000:
      case 5000:
      case 10000:
      case 20000:
      case 30000:
      case 50000:
        return { fontSize: "xl", fontWeight: "bold" };
      default:
        return {};
    }
  }, [tier]);
  return <Text {...styles}>{children || tier}</Text>;
});

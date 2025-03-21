import {
  Flex,
  Td,
  Text,
  Th,
  Tr,
  Table,
  Tbody,
  Thead,
  useBreakpoint,
  useColorMode,
} from "@chakra-ui/react";
import { getWeirdEventType } from "api/utils";
import { tierBorders } from "constants/tierborder";
import React, { FC, useContext } from "react";
import { MiniLeaderboardContext } from "src/contexts/MiniLeaderboardContext";
import { Tier as ITier } from "types/Leaderboard";
import { formatPoints } from "utils/formatPoints";
import { getIsPlayingStyles } from "utils/leaderboard";
import { getLastUpdatedTime } from "utils/time";
import { CenteredSpinner } from "./CenteredSpinner";
import { Tier } from "./Tier";

interface LeaderboardProps {
  title?: string;
  interval?: number;
  isSmall?: boolean;
  onTierSelected?: (tier: ITier) => void;
}

export const MiniLeaderboard: FC<LeaderboardProps> = ({
  isSmall,
  title,
  onTierSelected,
}) => {
  const { colorMode } = useColorMode();
  const breakpoint = useBreakpoint();
  const { lbData } = useContext(MiniLeaderboardContext);

  if (!lbData) return <CenteredSpinner />;

  const smallMode = isSmall || breakpoint === "base" || breakpoint === "sm";
  const hideIfSmall = smallMode && { display: "none" };
  return (
    <Flex flexDir="column">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Rank</Th>
            <Th>Name</Th>
            <Th>Points</Th>
            <Th textAlign="end" {...hideIfSmall}>
              Gap
            </Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lbData.map((entry, index, arr) => (
            <Tr
              {...(getIsPlayingStyles(entry, 0, undefined, colorMode) ?? {})}
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
              <Td isNumeric {...hideIfSmall}>
                {index + 1 < arr.length
                  ? entry.points - arr[index + 1]?.points
                  : 0}
              </Td>
              <Td>{getLastUpdatedTime(entry.date)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

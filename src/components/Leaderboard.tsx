import React, { FC, memo, useEffect, useMemo, useRef, useState } from "react";

import { Leaderboard as ILeaderboard, Tier as ITier } from "types/Leaderboard";
import { getLeaderboardData } from "api/getLeaderboardData";
import { sleep } from "utils/sleep";
import { Table, TableRowProps, Tbody, Thead } from "@chakra-ui/table";
import { Td, Th, Tr, Text, TextProps, Flex, Spinner } from "@chakra-ui/react";
import { DateTime, Duration } from "luxon";
import { tierBorders } from "constants/tierborder";
import humanize from "humanize-duration";

interface LeaderboardProps {
  interval?: number;
  isPlaying?: boolean;
}

export const Leaderboard: FC<LeaderboardProps> = ({
  interval = 1000,
  isPlaying: showIsPlaying = true,
}) => {
  const [lbData, setLbData] = useState<ILeaderboard>();
  const [changes, setChanges] = useState<{ [key: number]: number }>({});
  const [lastUpdated, setLastUpdated] = useState<Date>();

  const oldLb = useRef<ILeaderboard>();

  useEffect(() => {
    let killMe = false;
    const loop = async () => {
      // get muni
      const data = await getLeaderboardData();
      if (!killMe) {
        updateData(data);
        await sleep(interval);
        loop();
      }
    };
    loop();
    () => {
      killMe = true;
    };
  }, [interval]);

  const updateData = (data: ILeaderboard) => {
    if (oldLb.current) {
      setChanges((previousChanges) => {
        const changes = data.map((d) => {
          const old = oldLb.current?.find((olb) => olb.rank === d.rank);
          const dPoints = d.points - old.points;
          return [
            d.rank,
            // Only update if the new point is not 0 and not old enough
            dPoints > 0
              ? dPoints
              : DateTime.fromISO(d.date).diffNow().as("minutes") > -4
              ? previousChanges[d.rank]
              : 0,
          ];
        });
        return Object.fromEntries(changes);
      });
    }
    oldLb.current = data;
    setLbData(data);
    setLastUpdated(new Date());
  };

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

  if (!lbData) return <Spinner size="xl" mt="5" />;

  return (
    <Flex flexDir="column">
      <Flex flexDir="column">
        <Text fontSize="4xl" fontWeight="bold">
          Muniboard{" "}
          <Text fontSize="sm" as="span" fontWeight="normal">
            Last Updated: {lastUpdatedText}
          </Text>
        </Text>
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Rank</Th>
            <Th>Name</Th>
            <Th>Points</Th>
            <Th textAlign="end">Gap</Th>
            <Th textAlign="end">Rate</Th>
            <Th textAlign="end" whiteSpace="break-spaces">
              Time to boat
            </Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lbData.map((entry, index, arr) => (
            <Tr
              key={entry.rank}
              {...(showIsPlaying ? getIsPlayingStyles(entry.date) : {})}
              borderBottom={tierBorders.includes(entry.rank) && "2px solid"}
              borderBottomColor="gray.400"
            >
              <Td textAlign="center">
                <Tier tier={entry.rank} />
              </Td>
              <Td>
                <Text fontSize="md">{entry.name}</Text>
                <Text fontSize="xs">{entry.description}</Text>
              </Td>
              <Td>
                <Text fontSize="md">{entry.points}</Text>
                {changes?.[entry.rank] > 0 && (
                  <Text fontSize="xs">(+{changes[entry.rank] ?? 0})</Text>
                )}
              </Td>
              <Td isNumeric>
                {index + 1 < arr.length
                  ? entry.points - arr[index + 1]?.points
                  : 0}
              </Td>
              <Td isNumeric>{entry.rate}</Td>
              <Td isNumeric>
                {index + 1 < arr.length && !isNaN(Number(arr[index + 1]?.rate))
                  ? getToBoatTime(
                      ((entry.points - arr[index + 1]?.points) /
                        (Number(arr[index + 1]?.rate) - Number(entry.rate))) *
                        60 *
                        60 *
                        1000
                    )
                  : "-"}
              </Td>
              <Td>{getLastUpdateTime(entry.date)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};
const getIsPlayingStyles = (date: string): Partial<TableRowProps> => {
  return DateTime.fromISO(date).diffNow().as("minutes") > -10
    ? {
        bg: "gray.100",
      }
    : {};
};

const getToBoatTime = (ms: number): string => {
  if (isNaN(ms) || ms < 0) return "--:--";
  return Duration.fromMillis(ms).toFormat("hh:mm");
};

const getLastUpdateTime = (date: string) => {
  return DateTime.fromISO(date).diffNow().as("minute") > -3
    ? "Just now"
    : DateTime.now().diff(DateTime.fromISO(date)).toFormat("hh:mm");
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

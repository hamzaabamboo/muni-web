import React, { FC, memo, useEffect, useMemo, useRef, useState } from "react";

import { Leaderboard as ILeaderboard, Tier as ITier } from "types/Leaderboard";
import { getLeaderboardData } from "api/getLeaderboardData";
import { sleep } from "utils/sleep";
import { Table, TableRowProps, Tbody, Thead } from "@chakra-ui/table";
import { Td, Th, Tr, Text, TextProps } from "@chakra-ui/react";
import humanize from "humanize-duration";
import { DateTime } from "luxon";

interface LeaderboardProps {
  interval?: number;
  isPlaying?: boolean;
}

export const Leaderboard: FC<LeaderboardProps> = ({
  interval = 1000,
  isPlaying = true,
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

  if (!lbData) return null;
  return (
    <>
      <Text fontSize="md">
        Last Updated: {DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")}
      </Text>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Points</Th>
            <Th>Gap</Th>
            <Th>Rate</Th>
            <Th>Time to boat</Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lbData.map((entry, index, arr) => (
            <Tr key={entry.rank} {...getIsPlayingStyles(entry.date)}>
              <Td>
                <Tier tier={entry.rank} />
              </Td>
              <Td>{entry.name}</Td>
              <Td>
                {entry.points}
                (+{changes[entry.rank] ?? 0})
              </Td>
              <Td>
                {index + 1 < arr.length
                  ? entry.points - arr[index + 1]?.points
                  : 0}
              </Td>
              <Td>{entry.rate}</Td>
              <Td>
                {index + 1 < arr.length && !isNaN(Number(arr[index + 1]?.rate))
                  ? humanize(
                      ((entry.points - arr[index + 1]?.points) /
                        Number(arr[index + 1]?.rate)) *
                        60 *
                        60 *
                        1000,
                      { round: true, largest: 2 }
                    )
                  : "-"}
              </Td>
              <Td>
                {humanize(
                  DateTime.fromISO(entry.date).diffNow().as("milliseconds"),
                  { round: true, largest: 2 }
                )}{" "}
                ago
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ul></ul>
    </>
  );
};
const getIsPlayingStyles = (date: string): Partial<TableRowProps> => {
  return DateTime.fromISO(date).diffNow().as("minutes") > -10
    ? {
        bg: "gray.100",
      }
    : {};
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
      case 50000:
        return { fontSize: "xl", fontWeight: "bold" };
      default:
        return {};
    }
  }, [tier]);
  return <Text {...styles}>{children || tier}</Text>;
});

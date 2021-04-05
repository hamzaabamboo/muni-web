import { Table, Tbody, Td, Th, Thead, Tr, Text, Box } from "@chakra-ui/react";
import { thresholds } from "constants/threshold";
import { DateTime } from "luxon";
import React, { useContext, useMemo } from "react";
import { EventContext } from "src/contexts/EventContext";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { Tier } from "types/Leaderboard";

export const ChangesTable = ({ tier }: { tier: Tier }) => {
  const { pastUpdates } = useContext(LeaderboardChangesContext);
  const { event } = useContext(EventContext);
  const threshold = useMemo(() => {
    return event && thresholds[event.type];
  }, [event]);

  const list = useMemo(
    () =>
      pastUpdates
        ?.filter((u) => u.rank === tier)
        .sort((a, b) =>
          DateTime.fromSeconds(b.date)
            .diff(DateTime.fromSeconds(a.date))
            .as("minutes")
        ),
    [pastUpdates, threshold, tier]
  );
  return (
    <Box h="full" w="full" position="relative" maxH="600px" overflowX="auto">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Change</Th>
            <Th>Points</Th>
            <Th>Date/Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.length > 0 ? (
            list.map((t) => {
              return (
                <Tr
                  key={t.date}
                  bg={
                    threshold && t.change > threshold.maxPerGame
                      ? "red.200"
                      : "unset"
                  }
                >
                  <Td>+{t.change}</Td>
                  <Td>{t.points}</Td>
                  <Td>
                    {DateTime.fromSeconds(t.date).toFormat(
                      "HH:mm:ss dd/MM/yyyy"
                    )}
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={3}>
                <Text textAlign="center">No data yet, Collecting Data...</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

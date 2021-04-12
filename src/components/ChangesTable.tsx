import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { thresholds } from "constants/threshold";
import { DateTime } from "luxon";
import React, { useContext, useMemo } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { Tier } from "types/Leaderboard";
import { FixedSizeList } from "react-window";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";

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
          DateTime.fromISO(b.date).diff(DateTime.fromISO(a.date)).as("minutes")
        ),
    [pastUpdates, threshold, tier]
  );
  return (
    <Flex flexDir="column" alignItems="stretch" w="full">
      <Grid
        templateColumns="1fr 1fr 1fr 1fr"
        pr="20px"
        fontWeight="bold"
        fontSize="lg"
      >
        <GridItem>Change</GridItem>
        <GridItem>Player</GridItem>
        <GridItem>Points</GridItem>
        <GridItem>Date/Time</GridItem>
      </Grid>
      <FixedSizeList
        itemCount={list.length}
        itemSize={60}
        width="100%"
        height={600}
        itemData={list}
      >
        {({ index, style, data }) => {
          const t = data[index];
          return (
            <Grid
              key={t.date}
              bg={
                threshold && t.difference > threshold.maxPerGame
                  ? "red.200"
                  : "unset"
              }
              templateColumns="1fr 1fr 1fr 1fr"
              style={style}
            >
              <GridItem>+{t.change}</GridItem>
              <GridItem>{t.name}</GridItem>
              <GridItem>{t.points}</GridItem>
              <GridItem>
                {DateTime.fromISO(t.date).toFormat("HH:mm:ss dd/MM")}
              </GridItem>
            </Grid>
          );
        }}
      </FixedSizeList>
    </Flex>
  );
};

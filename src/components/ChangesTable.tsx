import { Fade, Flex, Grid, GridItem } from "@chakra-ui/react";
import { thresholds } from "constants/threshold";
import { DateTime } from "luxon";
import React, { useContext, useMemo } from "react";
import { FixedSizeList } from "react-window";
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
          DateTime.fromISO(b.date).diff(DateTime.fromISO(a.date)).as("minutes")
        ) ?? [],
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
            <Fade key={t.date} in={true}>
              <Grid
                bg={
                  threshold && t.difference > threshold.maxPerGame
                    ? "red.200"
                    : "unset"
                }
                alignItems="center"
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
            </Fade>
          );
        }}
      </FixedSizeList>
    </Flex>
  );
};

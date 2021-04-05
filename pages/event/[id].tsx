import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import axios from "axios";
import { AfterEventLeaderboard } from "components/AfterEventLeaderboard";
import { EventInfo } from "components/EventInfo";
import { Leaderboard } from "components/Leaderboard";
import { ScoreGraph } from "components/ScoreGraph";
import { TierSelector } from "components/TierSelector";
import { isoParse, max, maxIndex } from "d3";
import { useLocalStorage } from "hooks/useLocalstorage";
import Head from "next/head";
import React, { useMemo, useRef } from "react";
import { EventProvider } from "src/contexts/EventContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { Event } from "types/Event";
import { LeaderboardEntry, LeaderboardPoint } from "types/Leaderboard";
import { useSize } from "web-api-hooks";

export default function GraphPage(props: {
  event: Event;
  points: LeaderboardPoint[];
}) {
  const { event, points } = props;
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [showTooltip, setShowTooltip] = useLocalStorage<boolean>(
    "showTooltip",
    false
  );

  const leaderboardPoint = useMemo(() => {
    const tiers = Array.from(new Set(points.map((p) => p.rank)))
      .map((r) => {
        const p = points.filter((p) => p.rank === r);
        const latest = maxIndex(p, (p) => isoParse(p.date));
        return p[latest];
      })
      .map<LeaderboardEntry>((p) => {
        return p as LeaderboardEntry;
      })
      .sort((a, b) => a.rank - b.rank);
    return tiers;
  }, [points]);

  return (
    <>
      <Head>
        <title>Create むに web | {event.name}</title>
      </Head>
      <EventProvider event={event}>
        <GraphDisplayProvider points={points}>
          <LeaderboardProvider lbData={leaderboardPoint}>
            <EventInfo />
            <Flex flexDir={["column", null, null, "row"]} px={4}>
              <Flex flexDir="column" flex={1}>
                <Box ref={graphRef} minH="600px">
                  <ScoreGraph
                    width={width}
                    height={height}
                    showTooltip={showTooltip}
                    isSmall
                  />
                </Box>
                <Flex alignItems="center">
                  <Switch
                    isChecked={showTooltip}
                    onChange={(c) => setShowTooltip(c.target.checked)}
                  />
                  <Text ml={2}>
                    Show Details on hover
                    <Text
                      ml={1}
                      as="span"
                      color="red.600"
                      fontStyle="italic"
                      textAlign="center"
                    >
                      (This is super experimental, muni may break)
                    </Text>
                  </Text>
                </Flex>
                <TierSelector />
              </Flex>
              <Flex flex={1}>
                <AfterEventLeaderboard />
              </Flex>
            </Flex>
          </LeaderboardProvider>
        </GraphDisplayProvider>
      </EventProvider>
    </>
  );
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const event = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true`)
  ).data.find((e) => e.eventid === Number(id));
  const points = (
    await axios.get<LeaderboardPoint[]>(
      `http://www.projectdivar.com/eventdata/t20?all=true&event=${id}`
    )
  ).data;

  return {
    props: {
      event,
      points,
      isEventPage: true,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await axios.get<Event[]>(
    `http://www.projectdivar.com/ev?all=true`
  );

  return {
    paths: allEvents.data.map((e) => `/event/${e.eventid}`) || [],
    fallback: false,
  };
}

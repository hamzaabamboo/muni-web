import { Box, Button, Flex } from "@chakra-ui/react";
import { fixWeirdNumbering, getEventType, getProxiedUrl } from "api/utils";
import axios from "axios";
import { AfterEventLeaderboard } from "components/AfterEventLeaderboard";
import { AnalysisOptions } from "components/AnalysisOptions";
import { EventInfo } from "components/EventInfo";
import { GraphFlags } from "components/Graph";
import { GraphOptions } from "components/GraphOptions";
import { RateGraph } from "components/RateGraph";
import { ScoreGraph } from "components/ScoreGraph";
import { TierSelector } from "components/TierSelector";
import { isoParse, maxIndex } from "d3";
import { useLocalStorage } from "hooks/useLocalstorage";
import { DateTime } from "luxon";
import Head from "next/head";
import React, { useMemo, useRef, useState } from "react";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { EventProvider } from "src/contexts/EventContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { Event } from "types/Event";
import { LeaderboardEntry, LeaderboardPoint } from "types/Leaderboard";
import { getAbsolutePath } from "utils/assets";
import { useSize } from "web-api-hooks";

export default function GraphPage(props: {
  event: Event;
  points: LeaderboardPoint[];
}) {
  const { event, points } = props;
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(graphRef);
  const [graphMode, setGraphMode] = useState<"point" | "rate">("point");
  const [graphFlags, setGraphFlags] = useLocalStorage<GraphFlags>(
    "graphFlags",
    {
      showTooltip: false,
      advancedZoom: false,
    }
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

  const desc = useMemo(() => {
    return `${DateTime.fromISO(event.startdate)
      .setZone("Asia/Tokyo")
      .toFormat("dd/MM/yyyy HH:mm")}JST - ${DateTime.fromISO(event.enddate)
      .setZone("Asia/Tokyo")
      .toFormat("dd/MM/yyyy HH:mm")}JST | ${Math.round(
      DateTime.fromISO(event.enddate)
        .diff(DateTime.fromISO(event.startdate))
        .as("hours")
    )} hours | ${getEventType(event)}`;
  }, [event]);
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`https://hamzaabamboo.github.io/muni-web/event/${event.eventid}`}
        />
        <meta
          property="og:image"
          content={getAbsolutePath(
            `/images/events/banner/${event.eventid}.png`
          )}
        />
        <meta property="og:description" content={desc} />
      </Head>
      <EventProvider event={event}>
        <GraphDisplayProvider points={points}>
          <LeaderboardProvider lbData={leaderboardPoint}>
            <AnalysisProvider>
              <EventInfo />
              <Flex flexDir={["column", null, null, "row"]} px={4}>
                <Flex flexDir="column" flex={1}>
                  <Flex>
                    <Button
                      mx={4}
                      p={2}
                      rounded="md"
                      bg={graphMode === "point" ? "gray.200" : "transparent"}
                      color={graphMode === "point" ? "blue.400" : "black"}
                      onClick={() => setGraphMode("point")}
                      fontSize="lg"
                    >
                      Point
                    </Button>
                    <Button
                      mx={4}
                      p={2}
                      rounded="md"
                      bg={graphMode === "rate" ? "gray.200" : "transparent"}
                      color={graphMode === "rate" ? "blue.400" : "black"}
                      onClick={() => setGraphMode("rate")}
                      fontSize="lg"
                    >
                      Rate
                    </Button>
                  </Flex>
                  {graphMode === "point" ? (
                    <Box ref={graphRef} minH="600px">
                      <ScoreGraph
                        width={width}
                        height={height}
                        graphFlags={graphFlags}
                        isSmall
                      />
                    </Box>
                  ) : (
                    <>
                      <RateGraph graphFlags={graphFlags} />
                      <AnalysisOptions />
                    </>
                  )}
                  <GraphOptions
                    graphFlags={graphFlags}
                    setGraphFlags={setGraphFlags}
                  />

                  <TierSelector />
                  <Box
                    w="full"
                    position="relative"
                    display={["none", null, null, "block"]}
                  >
                    <img
                      src={getProxiedUrl(
                        `http://projectdivar.com:8080/event/t20_${
                          event.eventid - 2
                        }.png`
                      )}
                    />
                  </Box>
                </Flex>
                <Flex flex={1}>
                  <AfterEventLeaderboard />
                </Flex>
                <Box
                  w="full"
                  position="relative"
                  display={["block", null, null, "none"]}
                >
                  <img
                    src={getProxiedUrl(
                      `http://projectdivar.com:8080/event/t20_${
                        event.eventid - 2
                      }.png`
                    )}
                  />
                </Box>
              </Flex>
            </AnalysisProvider>
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
  ).data
    .map(fixWeirdNumbering)
    .find((e) => e.eventid === Number(id));

  const points = (
    await axios.get<LeaderboardPoint[]>(
      `http://www.projectdivar.com/eventdata/t20?all=true&event=${id - 2}`
    )
  ).data;

  return {
    props: {
      event,
      points,
      title: `Create むに web | ${event.name}`,
      isEventPage: true,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await axios.get<Event[]>(
    `http://www.projectdivar.com/ev?all=true`
  );

  return {
    paths:
      allEvents.data.map(fixWeirdNumbering).map((e) => `/event/${e.eventid}`) ||
      [],
    fallback: false,
  };
}

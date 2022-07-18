import { Box, Button, Flex } from "@chakra-ui/react";
import {
  fixWeirdNumbering,
  getWeirdEventType,
  getProxiedUrl,
  mapEvent,
} from "api/utils";
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
import { readdir, stat } from "fs/promises";
import { useLocalStorage } from "hooks/useLocalstorage";
import { DateTime } from "luxon";
import { GetStaticPropsContext } from "next";
import { join } from "path";
import React, { useMemo, useRef, useState } from "react";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { EventProvider } from "src/contexts/EventContext";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { LeaderboardProvider } from "src/contexts/LeaderboardContext";
import { Event, RawEvent } from "types/Event";
import { LeaderboardEntry, LeaderboardPoint } from "types/Leaderboard";
import { PageProps } from "types/PageProps";
import { getAbsolutePath } from "utils/assets";
import { decrypt } from "utils/encryption";
import { useSize } from "web-api-hooks";

interface EventPageProps {
  event: Event;
  points: LeaderboardPoint[];
}
export default function GraphPage(props: PageProps<EventPageProps>) {
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

  return (
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
                    colorScheme="blue"
                    variant={graphMode === "point" ? "solid" : "outline"}
                    onClick={() => setGraphMode("point")}
                    fontSize="lg"
                  >
                    Point
                  </Button>
                  <Button
                    mx={4}
                    p={2}
                    rounded="md"
                    colorScheme="blue"
                    variant={graphMode === "rate" ? "solid" : "outline"}
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
  );
}
export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<{ props: PageProps<EventPageProps> }> {
  const { id } = params;
  if (typeof id !== "string" || isNaN(Number(id))) return;

  const event = (
    JSON.parse(
      await decrypt(join(__dirname, "../../../../data/events"))
    ) as RawEvent[]
  )
    .map(mapEvent)
    .find((e) => {
      return e.eventid === Number(id);
    });

  try {
    await stat(join(__dirname, "../../../../data/results/" + id));
  } catch {
    return;
  }

  const points = JSON.parse(
    await decrypt(join(__dirname, "../../../../data/results/" + id))
  );

  const desc = `${DateTime.fromISO(event.startdate)
    .setZone("Asia/Tokyo")
    .toFormat("yyyy/MM/dd HH:mm")}JST - ${DateTime.fromISO(event.enddate)
    .setZone("Asia/Tokyo")
    .toFormat("yyyy/MM/dd HH:mm")}JST | ${Math.round(
    DateTime.fromISO(event.enddate)
      .diff(DateTime.fromISO(event.startdate))
      .as("hours")
  )} hours | ${getWeirdEventType(event)}`;

  return {
    props: {
      event,
      points,
      isStatic: true,
      head: {
        url: `https://hamzaabamboo.github.io/muni-web/event/${event.eventid}`,
        image: [
          getAbsolutePath(`/images/events/og_banner/${event.eventid}.png`),
          getAbsolutePath(`/images/events/banner/${event.eventid}.png`),
          getAbsolutePath(`/images/events/logo/${event.eventid}.png`),
        ],
        description: desc,
        title: `Create むに web | ${event.name}`,
      },
      backgroundImage: getAbsolutePath(
        `/images/events/background/${event.eventid}.jpg`
      ),
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await readdir(join(__dirname, "../../../../data/results"));
  return {
    paths: allEvents.filter((e) => e).map((e) => `/event/${e}`) || [],
    fallback: false,
  };
}

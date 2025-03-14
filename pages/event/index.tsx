import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Select, Text, Image } from "@chakra-ui/react";
import { fixWeirdNumbering, mapEvent } from "api/utils";
import axios from "axios";
import { EventDetails } from "components/EventDetails";
import { DateTime } from "luxon";
import Link from "next/link";
import { join } from "path";
import React, { FC, Fragment, useMemo, useState } from "react";
import { RawEvent, Event } from "types/Event";
import { PageProps } from "types/PageProps";
import { getAbsolutePath } from "utils/assets";
import { decrypt } from "utils/encryption";

interface AllEventsPageProps {
  allEvents: {
    withData: Event[];
    withoutData: Event[];
    noAssets: Event[];
  };
}
export const getStaticProps = async () => {
  const sigEvents = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true`)
  ).data.map(fixWeirdNumbering);

  const sigEventIds = sigEvents.map((d) => d.eventid);

  const decrypted = await decrypt(join(__dirname, "../../../data/events"));
  const events = (JSON.parse(decrypted) as RawEvent[]).map(mapEvent);

  return {
    props: {
      allEvents: {
        withData: events.filter((e) => sigEventIds.includes(e.id)),
        withoutData: events.filter((e) => !sigEventIds.includes(e.id)),
        noAssets: sigEvents.filter(
          (e) => !events.some((a) => a.eventid === e.eventid)
        )
      },
      isStatic: true,
      head: {
        title: `Create むに web | All Events`
      }
    } as PageProps<AllEventsPageProps>
  };
};
const allEventTypes = ["Medley", "Poker", "Bingo", "Raid"];
const AllEvents: FC<PageProps<AllEventsPageProps>> = ({ allEvents }) => {
  const { withData, withoutData, noAssets } = allEvents;
  const [eventType, selectEventType] = useState<string>("All");

  const withDataFiltered = useMemo(() => {
    if (eventType === "All") return withData;
    if (eventType === "Others")
      return withData.filter((e) => !allEventTypes.includes(e.type as string));
    return withData.filter((e) => {
      return e.type === eventType;
    });
  }, [eventType, withData]);

  const withoutDataFiltered = useMemo(() => {
    if (eventType === "All") return withoutData;
    if (eventType === "Others")
      return withoutData.filter(
        (e) => !allEventTypes.includes(e.type as string)
      );
    return withoutData.filter((e) => {
      return e.type === eventType;
    });
  }, [eventType, withoutData]);

  const noAssetsFiltered = useMemo(() => {
    if (eventType === "All") return noAssets;
    if (eventType === "Others")
      return noAssets.filter((e) => !allEventTypes.includes(e.type as string));
    return noAssets.filter((e) => {
      return e.type === eventType;
    });
  }, [eventType, noAssets]);

  return (
    <Box pt={8} width={["100%", null, "90%"]} mx="auto">
      <Flex flexDir="column" py={4} px={2} width={["100%", null, "50%"]}>
        <Text>Filter by Event Type</Text>
        <Select
          value={eventType}
          onChange={(e) => {
            selectEventType(e.target.value);
          }}
        >
          {["All", ...allEventTypes, "Others"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Flex>
      <Box px={2}>
        {[
          ...noAssetsFiltered,
          ...withDataFiltered.map((a) => ({ ...a, assets: true }))
        ]
          ?.filter(
            (e) => DateTime.fromISO(e.startdate).diffNow().as("second") < 0
          )
          .map((p: Event & { assets?: boolean }) => {
            return (
              <Link
                href={
                  DateTime.fromISO(p.enddate).diffNow().as("second") > 0
                    ? `/`
                    : `/event/${p.eventid}`
                }
                key={p.id}
              >
                <Flex flexDirection="column" cursor="pointer">
                  <Flex
                    px={2}
                    py={4}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Flex
                      w="full"
                      flexDirection={["column", null, "row"]}
                      justifyContent="space-between"
                    >
                      <Box order={[1, null, 0]}>
                        <Text fontSize="2xl" fontWeight="bold">
                          {p.name}
                        </Text>
                        <EventDetails event={p} />
                      </Box>
                      {p.assets && (
                        <Box
                          h={["unset", null, "80px"]}
                          order={[0, null, 1]}
                          margin={["0 auto", null, "auto 0"]}
                        >
                          <Image
                            src={getAbsolutePath(
                              `/images/events/banner/${p.eventid}.png`
                            )}
                            w={["full", null, "unset"]}
                            h="auto"
                            maxH={["unset", null, "full"]}
                            maxW="full"
                          />
                        </Box>
                      )}
                    </Flex>
                    <Box>
                      <ChevronRightIcon boxSize={8} />
                    </Box>
                  </Flex>
                  <Divider color="gray.200" />
                </Flex>
              </Link>
            );
          })}
      </Box>
      <Text fontSize="3xl" my={2}>
        Events without tracking
      </Text>
      <Flex px={2} alignItems="stretch" flexDir="column">
        {withoutDataFiltered
          ?.filter(
            (e) => DateTime.fromISO(e.startdate).diffNow().as("second") < 0
          )
          .map((p) => {
            return (
              <Fragment key={p.id}>
                <Flex flexDirection="column">
                  <Flex
                    px={2}
                    py={4}
                    flexDirection={["column", null, "row"]}
                    justifyContent="space-between"
                  >
                    <Box order={[1, null, 0]}>
                      <Text fontSize="2xl" fontWeight="bold">
                        {p.name}
                      </Text>
                      <EventDetails event={p} />
                    </Box>
                    <Box
                      h={["unset", null, "80px"]}
                      order={[0, null, 1]}
                      margin={["0 auto", null, "auto 0"]}
                    >
                      <Image
                        src={getAbsolutePath(
                          `/images/events/banner/${p.eventid}.png`
                        )}
                        w={["full", null, "unset"]}
                        h="auto"
                        maxH={["unset", null, "full"]}
                        maxW="full"
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Divider color="gray.200" />
              </Fragment>
            );
          })}
      </Flex>
    </Box>
  );
};

export default AllEvents;

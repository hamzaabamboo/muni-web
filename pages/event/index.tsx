import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Select, Text, Image } from "@chakra-ui/react";
import { fetchD4DB } from "api/fetchD4DB";
import { fixWeirdNumbering } from "api/utils";
import axios from "axios";
import { EventDetails } from "components/EventDetails";
import { DateTime } from "luxon";
import Link from "next/link";
import React, { FC, Fragment, useMemo, useState } from "react";
import { D4DBEvent, D4DBEventResponse, Event } from "types/Event";
import { PageProps } from "types/PageProps";
import { getAbsolutePath } from "utils/assets";

interface AllEventsPageProps {
  allEvents: {
    withData: Event[];
    withoutData: Event[];
  };
}
export const getStaticProps = async () => {
  const sigEvents = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true`)
  ).data
    .map(fixWeirdNumbering)
    .map((d) => d.eventid);

  const res: D4DBEventResponse = (
    await fetchD4DB<D4DBEvent>(["EventMaster"])
  )[0];

  const d4dbEvents = Object.values(res)
    .sort((b, a) => {
      return a.EndDate - b.EndDate;
    })
    .map<Event>((e) => ({
      id: e.Id,
      eventid: e.Id,
      name: e.Name,
      startdate: DateTime.fromSeconds(e.StartDate).toISO(),
      enddate: DateTime.fromSeconds(e.ReceptionCloseDate).toISO(),
      rank_end: DateTime.fromSeconds(e.EndDate).toISO(),
      type: e.Type._name_,
    }));

  return {
    props: {
      allEvents: {
        withData: d4dbEvents.filter((e) => sigEvents.includes(e.id)),
        withoutData: d4dbEvents.filter((e) => !sigEvents.includes(e.id)),
      },
      isStatic: true,
      head: {
        title: `Create むに web | All Events`,
      },
    } as PageProps<AllEventsPageProps>,
  };
};
const allEventTypes = ["Medley", "Poker", "Bingo", "Raid"];
const AllEvents: FC<PageProps<AllEventsPageProps>> = ({ allEvents }) => {
  const { withData, withoutData } = allEvents;
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

  return (
    <Box pt={10} px={2} width={["100%", null, "80%"]} mx="auto">
      <Flex flexDir="column" width={["100%", null, "50%"]}>
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
        {withDataFiltered
          ?.filter(
            (e) => DateTime.fromISO(e.startdate).diffNow().as("second") < 0
          )
          .map((p) => {
            return (
              <Link href={`/event/${p.eventid}`} key={p.id}>
                <Flex flexDirection="column">
                  <Flex
                    px={2}
                    py={4}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Flex w="full" justifyContent="space-between">
                      <Box>
                        <Text fontSize="2xl" fontWeight="bold">
                          {p.name}
                        </Text>
                        <EventDetails event={p} />
                      </Box>
                      <Box h="80px" margin={["0 auto", null, "auto 0"]}>
                        <Image
                          src={getAbsolutePath(
                            `/images/events/banner/${p.eventid}.png`
                          )}
                          maxH="full"
                          maxW="full"
                        />
                      </Box>
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
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Text fontSize="2xl" fontWeight="bold">
                        {p.name}
                      </Text>
                      <EventDetails event={p} />
                    </Box>
                    <Box h="80px" margin={["0 auto", null, "auto 0"]}>
                      <Image
                        src={getAbsolutePath(
                          `/images/events/banner/${p.eventid}.png`
                        )}
                        maxH="full"
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

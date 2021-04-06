import { Box, Divider, Text, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { getAllEvents } from "api/events";
import { Event } from "types/Event";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import React, { Fragment, useCallback, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import Link from "next/link";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getStaticProps = () => {
  return {
    props: {
      isEventPage: false,
    },
  };
};
const AllEvents = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const router = useRouter();

  const getEvents = useCallback(async () => {
    return getAllEvents();
  }, []);
  usePromiseEffect(getEvents, setAllEvents);

  return (
    <Box pt={10} px={2} width={["100%", "80%"]} mx="auto">
      {allEvents?.map((p) => {
        return (
          <Link href={`/event/${p.eventid}`} key={p.id}>
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
                  <Text fontSize="xl">{p.type}</Text>
                  <Text>
                    {DateTime.fromISO(p.startdate).toFormat("dd/MM/yyyy HH:mm")}{" "}
                    - {DateTime.fromISO(p.enddate).toFormat("dd/MM/yyyy HH:mm")}
                  </Text>
                </Box>
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
  );
};

export default AllEvents;

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import Link from "next/link";
import React, { FC } from "react";
import { Event } from "types/Event";

export const getStaticProps = async () => {
  const allEvents = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true`)
  ).data;
  return {
    props: {
      allEvents,
      isEventPage: true,
    },
  };
};
const AllEvents: FC<{ allEvents: Event[] }> = ({ allEvents }) => {
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

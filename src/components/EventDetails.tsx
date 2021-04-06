import { Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { memo } from "react";
import { Event } from "types/Event";

export const EventDetails = memo(({ event }: { event: Event }) => {
  return (
    <Text>
      <Text as="span" mr={2}>
        {DateTime.fromISO(event.startdate).toFormat("dd/MM/yyyy HH:mm")} -{" "}
        {DateTime.fromISO(event.enddate).toFormat("dd/MM/yyyy HH:mm")}
      </Text>{" "}
      |
      <Text as="span" ml={2}>
        {Math.round(
          DateTime.fromISO(event.enddate)
            .diff(DateTime.fromISO(event.startdate))
            .as("hours")
        )}{" "}
        hours
      </Text>
    </Text>
  );
});

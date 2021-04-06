import { Text, TypographyProps } from "@chakra-ui/react";
import { getEventType } from "api/utils";
import { DateTime } from "luxon";
import { memo, useMemo } from "react";
import { Event } from "types/Event";

export const EventDetails = memo(
  ({
    align,
    event,
  }: {
    align?: TypographyProps["textAlign"];
    event: Event;
  }) => {
    const eventType = useMemo(() => {
      return getEventType(event);
    }, [event]);
    return (
      <Text textAlign={align || "start"}>
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
        </Text>{" "}
        |
        <Text as="span" ml={2}>
          {eventType}
        </Text>
      </Text>
    );
  }
);

import { Text, TypographyProps } from "@chakra-ui/react";
import { getWeirdEventType } from "api/utils";
import { DateTime } from "luxon";
import { memo, useMemo } from "react";
import { Event } from "types/Event";

const EventDetails = memo(
  ({
    align,
    event,
  }: {
    align?: TypographyProps["textAlign"];
    event: Event;
  }) => {
    const eventType = useMemo(() => {
      return getWeirdEventType(event);
    }, [event]);
    return (
      <Text textAlign={align || "start"}>
        <Text as="span" mr={2}>
          {DateTime.fromISO(event.startdate).toFormat("yyyy/MM/dd  HH:mm")} -{" "}
          {DateTime.fromISO(event.enddate).toFormat("yyyy/MM/dd HH:mm")}
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

EventDetails.displayName = "EventDetails";
export { EventDetails };

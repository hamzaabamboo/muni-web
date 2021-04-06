import { Text, TypographyProps } from "@chakra-ui/react";
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
      if (typeof event.type === "string") return event.type;

      switch (event.type) {
        case 0:
          return "Poker";
        case 1:
          return "Bingo";
        case 2:
          return "Medley";
        case 3:
          return "Raid";
        default:
          return event.type;
      }
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

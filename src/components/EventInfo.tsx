import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EventContext } from "src/contexts/EventContext";
import { getAbsolutePath } from "utils/assets";
import { EventDetails } from "./EventDetails";

export const EventInfo = () => {
  const { event } = useContext(EventContext);

  if (!event) return null;

  return (
    <Flex flexDirection="column" py={2}>
      <Flex
        flexDirection={["column", null, "row"]}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" order={[2, null, 1]}>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            textAlign={["center", null, "start"]}
          >
            {event.name}
          </Text>
          <EventDetails align={["center", null, "start"]} event={event} />
          {DateTime.fromISO(event.enddate).diffNow().as("second") > 0 && (
            <CountdownTimer
              startTime={event.startdate}
              rankEndTime={event.enddate}
              resultsTime={event.enddate}
            />
          )}
        </Flex>
        <Box h="120" margin={["0 auto", null, "auto 0"]} order={[1, null, 2]}>
          <Image
            src={getAbsolutePath(`/images/events/logo/${event.eventid}.png`)}
            maxH="full"
            maxW="full"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

const CountdownTimer = ({
  startTime,
  rankEndTime,
  resultsTime,
}: {
  startTime: string;
  rankEndTime: string;
  resultsTime: string;
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("--:--");
  const [timeUntil, setTimeUntil] = useState<string>("");
  const [progress, setProgress] = useState<string>("-");

  const totalHours = useMemo(() => {
    return Math.round(
      DateTime.fromISO(rankEndTime)
        .diff(DateTime.fromISO(startTime))
        .as("hours")
    );
  }, [startTime, rankEndTime]);

  useEffect(() => {
    let canceled = false;
    const f = () => {
      const diffStart = DateTime.fromISO(startTime).diffNow();
      const diffEnd = DateTime.fromISO(rankEndTime).diffNow();
      const diffResults = DateTime.fromISO(resultsTime).diffNow();
      const timeInEvent = Math.floor(
        DateTime.now().diff(DateTime.fromISO(startTime)).as("hours")
      );

      if (canceled) return;
      if (diffStart.as("hours") > 0) {
        setTimeUntil("Time until start");
        setTimeLeft(diffStart.toFormat("hh:mm"));
        setProgress(undefined);
        return;
      } else if (diffEnd.as("hours") > 0) {
        setTimeUntil("Time until end");
        setTimeLeft(diffEnd.toFormat("hh:mm"));
      } else if (diffResults.as("hours") > 0) {
        setTimeUntil("Time until results");
        setTimeLeft(diffResults.toFormat("hh:mm"));
      }

      setProgress(
        `${
          timeInEvent > totalHours ? totalHours : timeInEvent
        } / ${totalHours} ${
          timeInEvent > totalHours
            ? "100"
            : Math.round((timeInEvent / totalHours) * 100)
        }%`
      );
    };

    f();

    const interval = setInterval(f, 30000);

    () => {
      clearInterval(interval);
      canceled = true;
    };
  }, [totalHours]);
  return (
    <Flex
      flexDirection="column"
      justifyContent={["center", null, "start"]}
      py={4}
    >
      {progress && (
        <Text textAlign={["center", null, "start"]}>Progress: {progress}</Text>
      )}
      <Text textAlign={["center", null, "start"]}>
        {timeUntil}:
        <Text fontSize="lg" fontWeight="bold" as="span" ml="2">
          {timeLeft}
        </Text>
      </Text>
    </Flex>
  );
};

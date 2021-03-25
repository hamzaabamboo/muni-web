import { Flex, Text } from "@chakra-ui/react";
import { getEventData } from "api/getEventData";
import { DateTime } from "luxon";
import React, { useEffect, useMemo, useState } from "react";
import { Event as IEvent } from "types/Event";

export const EventInfo = () => {
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    const f = async () => {
      const data = await getEventData();
      setEvent(data);
    };
    f();
  }, []);

  if (!event) return null;

  return (
    <Flex flexDirection="column">
      <Text fontWeight="bold" fontSize="3xl" textAlign="center">
        {event.name}
      </Text>
      <CountdownTimer
        startTime={event.startdate}
        endTime={event.enddate}
        resultsTime={event.rank_end}
      />
    </Flex>
  );
};

const CountdownTimer = ({
  startTime,
  endTime,
  resultsTime,
}: {
  startTime: string;
  endTime: string;
  resultsTime: string;
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("--:--");
  const [timeUntil, setTimeUntil] = useState<string>("");
  const [progress, setProgress] = useState<string>("-");

  const totalHours = useMemo(() => {
    return Math.round(
      DateTime.fromISO(endTime).diff(DateTime.fromISO(startTime)).as("hours")
    );
  }, [startTime, endTime]);

  useEffect(() => {
    const f = () => {
      const diffEnd = DateTime.fromISO(endTime).diffNow();
      if (diffEnd.as("hours") > 0) {
        setTimeUntil("Time until end");
        setTimeLeft(diffEnd.toFormat("hh:mm"));
      }
      const diffResults = DateTime.fromISO(resultsTime).diffNow();
      if (diffResults.as("hours") > 0) {
        setTimeUntil("Time until results");
        setTimeLeft(diffResults.toFormat("hh:mm"));
      }
      const timeInEvent = Math.round(
        DateTime.now().diff(DateTime.fromISO(startTime)).as("hours")
      );

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
    const interval = setInterval(f, 1000);

    () => {
      clearInterval(interval);
    };
  }, [totalHours]);
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Text textAlign="center">Progress: {progress}</Text>
      <Text textAlign="center">{timeUntil}</Text>
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        {timeLeft}
      </Text>
    </Flex>
  );
};

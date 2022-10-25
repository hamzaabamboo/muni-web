import { DateTime } from "luxon";
import { RawEvent, Event, EventType } from "types/Event";

export const getProxiedUrl = (url: string) => {
  if (process.env.NODE_ENV === "development")
    return (
      (process.env.NEXT_PUBLIC_BASE_URL || "") +
      "/api/proxy?url=" +
      encodeURIComponent(url)
    );
  if (url.match("projectdivar"))
    return "https://hambot.ham-san.net/d4dj/sig?url=" + encodeURIComponent(url);
  if (url.match("d4-dj"))
    return (
      "https://hambot.ham-san.net/d4dj/d4db?url=" + encodeURIComponent(url)
    );
  return url;
};

export const fixWeirdNumbering = <T extends { eventid: number }>(e: T): T => ({
  ...e,
  eventid: e.eventid + 2,
});

export const getWeirdEventType = <T extends { type?: string | EventType }>(
  event: T
): string | number => {
  if (!event) return;
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
    case 4:
      return "Slot";
    case 5:
      return "Growth";
    case 6:
      return "Rave";
    default:
      return event.type;
  }
};

export const getRawEventType = (type: number): string | number => {
  switch (type) {
    case 1:
      return "Bingo";
    case 2:
      return "Medley";
    case 3:
      return "Poker";
    case 4:
      return "Raid";
    case 5:
      return "Slot";
    case 6:
      return "Growth";
    case 7:
      return "Rave";
    default:
      return type;
  }
};

export const mapEvent = (e: RawEvent) => ({
  id: e.id,
  eventid: e.id,
  name: e.name,
  startdate: DateTime.fromSeconds(e.startDate).toISO(),
  enddate: DateTime.fromSeconds(e.receptionCloseDate).toISO(),
  rank_end: DateTime.fromSeconds(e.endDate).toISO(),
  type: getRawEventType(e.type),
});

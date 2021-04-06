import { Event } from "types/Event";

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

export const getEventType = (event: Event) => {
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
};

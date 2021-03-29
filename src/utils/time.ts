import { DateTime } from "luxon";

export const getLastUpdatedTime = (date: string) => {
  return DateTime.fromISO(date).diffNow().as("minute") > -3
    ? "Just now"
    : DateTime.now().diff(DateTime.fromISO(date)).toFormat("hh:mm");
};

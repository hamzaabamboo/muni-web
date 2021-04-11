import { max, min } from "d3";
import { isoParse } from "d3-time-format";
import { DateTime } from "luxon";

export const groupByTime = <T extends { date: string } = any>(
  data: T[],
  interval: number = 3600000
): { date: string; data: T[] }[] => {
  const times: Record<number, T[]> = {};
  const minTime = Math.floor(
    DateTime.fromJSDate(min(data, (d) => isoParse(d.date))).toMillis() /
      interval
  );
  const maxTime = Math.floor(
    DateTime.fromJSDate(max(data, (d) => isoParse(d.date))).toMillis() /
      interval
  );
  for (let t = minTime; t < maxTime; t += 1) {
    times[t] = [];
  }
  data.forEach((d) => {
    const timestamp = DateTime.fromISO(d.date).toMillis();
    const k = Math.floor(timestamp / interval);
    if (!(k in times)) times[k] = [];
    times[k].push(d);
  });
  return Object.entries(times).map(([time, data]) => {
    return {
      date: DateTime.fromMillis(interval * Number(time)).toISO(),
      data: data,
    };
  });
};

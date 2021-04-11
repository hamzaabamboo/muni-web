import { max, min } from "d3";
import { isoParse } from "d3-time-format";
import { DateTime } from "luxon";

export const groupByTime = <T extends { date: string } = any>(
  data: T[],
  interval: number = 3600000
): { date: string; data: T[] }[] => {
  const times: Record<number, T[]> = Object.fromEntries(
    generateTimeArray(
      min(data, (d) => isoParse(d.date)),
      max(data, (d) => isoParse(d.date)),
      interval
    ).map((d) => [d, []])
  );
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

export const generateTimeArray = (start: Date, end: Date, interval: number) => {
  const startDate = DateTime.fromJSDate(start);
  const endDate = DateTime.fromJSDate(end);
  const minTime = Math.ceil(startDate.toMillis() / interval);
  const maxTime = Math.ceil(endDate.toMillis() / interval);
  return Array(maxTime - minTime)
    .fill(null)
    .map((_, i) => {
      return minTime + i;
    });
};

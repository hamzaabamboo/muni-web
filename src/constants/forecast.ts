import { EventType } from "types/Event";
import { Tier } from "types/Leaderboard";

export const forecastConstant: Record<
  EventType,
  Record<number, { hoursBeforeEnd: number; accleration: number }>
> = {
  Raid: {
    500: {
      hoursBeforeEnd: 7,
      accleration: 2000,
    },
    1000: {
      hoursBeforeEnd: 6,
      accleration: 2000,
    },
    2000: {
      hoursBeforeEnd: 4,
      accleration: 2000,
    },
    5000: {
      hoursBeforeEnd: 4,
      accleration: 800,
    },
    10000: {
      hoursBeforeEnd: 4,
      accleration: 500,
    },
    20000: {
      hoursBeforeEnd: 4,
      accleration: 80,
    },
    30000: {
      hoursBeforeEnd: 4,
      accleration: 25,
    },
    50000: {
      hoursBeforeEnd: 4,
      accleration: 15,
    },
  },
};

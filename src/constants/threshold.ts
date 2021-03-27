import { EventType } from "types/Event";

interface EventThesholds {
  [key: string]: {
    avgRage?: number;
    fastRate?: number;
    maxPerGame?: number;
    avgBurning?: number;
    burningRate?: number;
  };
}

export const thresholds: EventThesholds = {
  Medley: {
    maxPerGame: 2700,
  },
};

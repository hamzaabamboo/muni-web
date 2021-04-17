import { EventType } from "types/Event";

interface Threshold {
  name?: string;
  value?: number;
  color?: string;
}
type EventThesholds = Record<EventType, Threshold[]>;

export const thresholds: EventThesholds = {
  Medley: [{ name: "Max Per Game", value: 2700 }],
  Poker: [
    { name: "Manual Rate", value: 1800 },
    { name: "Rooming Rate", value: 2100 },
  ],
  Raid: [{ name: "Max", value: 2200 }],
};

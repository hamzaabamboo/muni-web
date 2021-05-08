import { EventType } from "types/Event";

interface Threshold {
  name?: string;
  value?: number;
  color?: string;
}
type EventThesholds = Record<EventType, Threshold[]>;

export const thresholds: EventThesholds = {
  Medley: [{ name: "Max Per Game", value: 3200 }],
  Poker: [
    { name: "Manual Rate", value: 1800 },
    { name: "Rooming Rate", value: 2100 },
  ],
  Raid: [{ name: "Max", value: 2200 }],
  Bingo: [
    { name: "Winning", value: 3000 },
    { name: "Playing", value: 2500 },
  ],
};

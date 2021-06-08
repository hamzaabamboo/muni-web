import { EventType } from "types/Event";

interface Threshold {
  name?: string;
  value?: number;
  color?: string;
}
type EventThesholds = Record<EventType, Threshold[]>;

export const thresholds: EventThesholds = {
  Medley: [
    { name: "Nyoom", value: 5200 },
    { name: "Good Room", value: 4700 },
    { name: "Rooming", value: 4000 },
  ],
  Poker: [
    { name: "Manual Rate", value: 1800 },
    { name: "Rooming Rate", value: 2100 },
  ],
  Raid: [{ name: "Max", value: 2200 }],
  Bingo: [
    { name: "Winning", value: 4800 },
    { name: "Playing", value: 3000 },
  ],
};

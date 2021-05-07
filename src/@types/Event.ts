export interface Event {
  id: number;
  type?: EventType;
  eventid: number;
  name: string;
  startdate: string;
  enddate: string;
  // eslint-disable-next-line
  rank_end: string;
}

export interface RawEvent {
  id: number;
  name: string;
  endDate: number;
  rankFixStartDate: number;
  receptionCloseDate: number;
  resultAnnouncementDate: number;
  startDate: number;
  type: number;
}

export type EventType = "Poker" | "Medley" | "Bingo" | "Raid" | string | number;

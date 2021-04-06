export interface Event {
  id: number;
  type?: EventType;
  eventid: number;
  name: string;
  startdate: string;
  enddate: string;
  rank_end: string;
}

export interface D4DBEvent {
  Id: number;
  Name: string;
  EndDate: number;
  RankFixStartDate: number;
  ReceptionCloseDate: number;
  ResultAnnouncementDate: number;
  StartDate: number;
  Type: {
    _name_: EventType;
    _value_: string;
  };
}
export type D4DBEventResponse = Record<string, D4DBEvent>;
export type EventType = "Poker" | "Medley" | "Bingo" | "Raid" | string | number;

export interface Event {
  id: number;
  type?: string;
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
    __name__: string;
    __value__: string;
  };
}

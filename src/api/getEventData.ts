import axios from "axios";
import { DateTime } from "luxon";
import { D4DBEvent, Event } from "types/Event";
import { fetchD4DB } from "./fetchD4DB";

export const getEventData = async (): Promise<Event> => {
  const res = await fetchD4DB<D4DBEvent>(["EventMaster"]);
  const towa = Object.values(res[0]).find((e) => {
    return (
      DateTime.fromSeconds(e.StartDate).diffNow().as("seconds") < 0 &&
      DateTime.fromSeconds(e.RankFixStartDate).diffNow().as("seconds") > 0
    );
  });

  return {
    id: 101,
    eventid: towa.Id,
    name: towa.Name,
    startdate: DateTime.fromSeconds(towa.StartDate).toISO(),
    enddate: DateTime.fromSeconds(towa.EndDate).toISO(),
    rank_end: DateTime.fromSeconds(towa.RankFixStartDate).toISO(),
    type: towa.Type._name_,
  };
};

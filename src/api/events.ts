import axios from "axios";
import { Event } from "types/Event";
import { fixWeirdNumbering, getProxiedUrl } from "./utils";

export const getEventData = async (): Promise<Event> => {
  const res = await axios.get<Event>(
    getProxiedUrl(`http://www.projectdivar.com/ev`)
  );
  return fixWeirdNumbering(res.data);
};

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await axios.get<Event[]>(
    getProxiedUrl(`http://www.projectdivar.com/ev?all=true`)
  );
  return res.data.map(fixWeirdNumbering);
};

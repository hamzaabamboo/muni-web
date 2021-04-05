import axios from "axios";
import { Event } from "types/Event";
import { getProxiedUrl } from "./utils";

export const getEventData = async (): Promise<Event> => {
  const res = await axios.get<Event>(
    getProxiedUrl(`http://www.projectdivar.com/ev`)
  );
  return res.data;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await axios.get<Event[]>(
    getProxiedUrl(`http://www.projectdivar.com/ev?all=true`)
  );
  return res.data;
};

import axios from "axios";
import { Event } from "types/Event";
import { fixWeirdNumbering, getProxiedUrl } from "./utils";

export const getEventData = (server = "jp") => async (): Promise<Event> => {
  const res = await axios.get<Event>(
    getProxiedUrl(
      `http://www.projectdivar.com/ev?${server === "en" ? "en=true" : ""}`
    )
  );
  return fixWeirdNumbering(res.data);
};

export const getAllEvents = (server = "jp") => async (): Promise<Event[]> => {
  const res = await axios.get<Event[]>(
    getProxiedUrl(
      `http://www.projectdivar.com/ev?all=true${
        server === "en" ? "&en=true" : ""
      }`
    )
  );
  return res.data.map(fixWeirdNumbering);
};

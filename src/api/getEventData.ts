import axios from "axios";
import { Event } from "types/Event";
import { Leaderboard } from "types/Leaderboard";
import { getProxiedUrl } from "./utils";

export const getEventData = async (): Promise<Event> => {
  const res = await axios.get<Event[]>(
    getProxiedUrl("http://projectdivar.com/eventdata/progress?id=13")
  );
  return res.data[0];
};

import axios from "axios";
import { LeaderboardPoint } from "types/Leaderboard";
import { getProxiedUrl } from "./utils";

export const getAllLeaderboard = async () => {
  const res = await axios.get<LeaderboardPoint[]>(
    getProxiedUrl("http://www.projectdivar.com/eventdata/t20?all=true&event=14")
  );
  return res.data.sort((a, b) => a.id - b.id);
};

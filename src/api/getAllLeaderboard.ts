import axios from "axios";
import { LeaderboardPoint } from "types/Leaderboard";
import { fixWeirdNumbering, getProxiedUrl } from "./utils";

export const getAllLeaderboard = (server = "jp") => async (event: number) => {
  const res = await axios.get<LeaderboardPoint[]>(
    getProxiedUrl(
      `http://www.projectdivar.com/eventdata/t20?all=true&event=${event - 2}${
        server === "en" ? "&en=true" : ""
      }`
    )
  );
  return res.data.sort((a, b) => a.id - b.id).map(fixWeirdNumbering);
};

import axios from "axios";
import { Leaderboard } from "types/Leaderboard";
import { fixWeirdNumbering, getProxiedUrl } from "./utils";

export const getLeaderboardData = (
  server = "jp"
) => async (): Promise<Leaderboard> => {
  const res = await Promise.all([
    axios.get<Leaderboard>(
      getProxiedUrl(
        `http://www.projectdivar.com/eventdata/t20${
          server === "en" ? "?en=true" : ""
        }`
      )
    ),
    axios.get<Leaderboard>(
      getProxiedUrl(
        `http://www.projectdivar.com/eventdata/t50${
          server === "en" ? "?en=true" : ""
        }`
      )
    ),
  ]);
  return res
    .map((e) => e.data)
    .reduce((acc, curr) => [...acc, ...curr])
    .sort((a, b) => a.rank - b.rank)
    .map(fixWeirdNumbering);
};

import axios from "axios";
import { Leaderboard, LeaderboardEntry } from "types/Leaderboard";
import { getProxiedUrl } from "./utils";

export const getLeaderboardData = async (): Promise<Leaderboard> => {
  const res = await Promise.all([
    axios.get<Leaderboard>(
      getProxiedUrl("http://www.projectdivar.com/eventdata/t20")
    ),
    axios.get<Leaderboard>(
      getProxiedUrl("http://www.projectdivar.com/eventdata/t50")
    ),
  ]);
  return res
    .map((e) => e.data)
    .reduce((acc, curr) => [...acc, ...curr])
    .sort((a, b) => a.rank - b.rank);
};

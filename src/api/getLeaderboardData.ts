import axios from "axios";
import { Leaderboard, LeaderboardConfig } from "types/Leaderboard";
import { fixWeirdNumbering, getProxiedUrl } from "./utils";

export const getMiniLeaderboardOverview = async (eventid: number) => {
  const res = await axios.get<
    {
      eventid: string;
      leaderboardtype: string;
      leaderboardid: string;
    }[]
  >(
    getProxiedUrl(
      `http://www.projectdivar.com/event/leaderboard?eventid=${eventid}&overview=true`
    )
  );
  return res.data
    .map((d) => ({
      eventid: Number(d.eventid),
      leaderboardType: Number(d.leaderboardtype),
      leaderboardId: Number(d.leaderboardid),
    }))
    .map(fixWeirdNumbering);
};
export const getLeaderboardData =
  (server = "jp") =>
  async (config?: LeaderboardConfig): Promise<Leaderboard> => {
    if (!config) {
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
    } else {
      const res = await Promise.all([
        axios.get<Leaderboard>(
          getProxiedUrl(
            `http://www.projectdivar.com/event/leaderboard?leaderboardType=${
              config.leaderboardType
            }&leaderboardId=${config.leaderboardId}&${
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
    }
  };

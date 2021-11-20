import { LeaderboardPoint, PastChangeEntry, Tier } from "types/Leaderboard";

export const mapPointsToChanges = (p: LeaderboardPoint): PastChangeEntry => ({
  event: p.eventid,
  rank: p.rank as Tier,
  change: -1 * Number(p.difference),
  date: p.date,
  points: p.points,
  name: p.name,
  playerid: p.playerid,
});

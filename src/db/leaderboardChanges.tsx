import { PastChangeEntry } from "types/Leaderboard";
import { db } from ".";
import { wrapErrorHandler } from "./wrapErrorHandler";

export const getLeaderboardChanges = wrapErrorHandler(async (event: number) => {
  const res = await db
    .table<PastChangeEntry>("leaderboardChanges")
    .where("event")
    .equals(event)
    .toArray();
  return res;
});

export const saveLeaderboardChanges = wrapErrorHandler(
  async (points: PastChangeEntry[]) => {
    return db.table<PastChangeEntry>("leaderboardChanges").bulkAdd(points);
  }
);

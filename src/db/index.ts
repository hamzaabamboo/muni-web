import Dexie from "dexie";

export let db: Dexie;

export const initDB = () => {
  db = new Dexie("munimuni");
  db.version(1).stores({
    leaderboardChanges: "++id, event, rank, date, points, change",
  });
};
try {
  initDB();
} catch (e) {
  console.log("fuck");
  db.delete();
  initDB();
}

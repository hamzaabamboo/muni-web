import axios from "axios";
import { writeFile } from "fs/promises";
import { groupBy } from "lodash";
import { join } from "path";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { Event } from "../src/@types/Event";
import { fixWeirdNumbering } from "../src/api/utils";
import { encrypt } from "../src/utils/encryption";
import { groupByTime } from "../src/utils/groupByTime";

require("dotenv").config();

const serialize = (data: LeaderboardPoint[]) => {
  return data.map((item) => {
    const {
      id,
      eventid,
      rank,
      date,
      name,
      description,
      difference,
      points,
      playerid,
    } = item;
    return [
      id,
      eventid,
      rank,
      date,
      name,
      description,
      difference,
      points,
      playerid,
    ];
  });
};
async function getEventData(en = false) {
  const event = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true${en === true ? "&en=true" : ''}`)
  ).data.map(fixWeirdNumbering);
  const p = event.map(async (e) => {
    // try {
    //   await stat(join(__dirname, `../data/${en === true ? "en/" : ''}results/` + e.eventid));
    //   console.log("skipping", e.eventid);
    //   return;
    // } catch {}
    try {
      const points = (
        await axios.get<LeaderboardPoint[]>(
          `http://www.projectdivar.com/eventdata/t20?all=true&event=${
            Number(e.eventid) - 2
          }${en === true ? "&en=true" : ''}`
        )
      ).data;
      console.log("fetching", e.eventid, en ? "(en)": "");
      const prunedPoints = Object.values(groupBy(points, (p) => p.rank as Tier)).flatMap(g => groupByTime(g, 300000).map((d) => d.data.slice(-1)[0]).filter(d => !!d))
      const encryptedTxt = await encrypt(JSON.stringify(serialize(prunedPoints)))
      await writeFile(
        join(__dirname, `../data/${en === true ? "en/" : ''}results/` + e.eventid),
        encryptedTxt
      );
    } catch {
      console.error(e.eventid, "load failed");
    }
  });

  await Promise.all(p);
}

async function main() {
  try {
    await getEventData();
    await getEventData(true);
  } catch (e) {
    console.log("error", e);
  }
}

main();

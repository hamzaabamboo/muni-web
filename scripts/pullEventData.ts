import { decode } from "@msgpack/msgpack";
import axios from "axios";
import { createWriteStream, readFileSync, statSync } from "fs";
import { copyFile, mkdir, writeFile } from "fs/promises";
import { DateTime } from "luxon";
import { join } from "path";
import { LeaderboardPoint } from "types/Leaderboard";
import { generateEventBanner } from "../scripts/generateEventBanner";
import { Event, RawEvent } from "../src/@types/Event";
import { fixWeirdNumbering, mapEvent } from "../src/api/utils";
import { encrypt } from "../src/utils/encryption";

require("dotenv").config();

async function getEventData() {
  const event = (
    await axios.get<Event[]>(`http://www.projectdivar.com/ev?all=true`)
  ).data.map(fixWeirdNumbering);
  const p = event.map(async (e) => {
    const points = (
      await axios.get<LeaderboardPoint[]>(
        `http://www.projectdivar.com/eventdata/t20?all=true&event=${
          Number(e.eventid) - 2
        }`
      )
    ).data;
    const encryptedTxt = await encrypt(JSON.stringify(points));
    await writeFile(
      join(__dirname, "../data/results/" + e.eventid),
      encryptedTxt
    );
  });

  await Promise.all(p);
}

async function main() {
  await getEventData();
}

main();

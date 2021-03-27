import axios from "axios";
import { getProxiedUrl } from "./utils";

export const fetchD4DB = async <T>(
  dbs: string[]
): Promise<{ [id: string]: T }[]> => {
  const res = await axios.post<{
    result: { [key: string]: { [id: string]: T } };
  }>(getProxiedUrl("http://d4-dj-frontend.vercel.app/api/dbs"), { dbs });
  return dbs.map((db) => res.data.result[db]);
};

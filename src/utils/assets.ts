import { join } from "path";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getAbsolutePath = (path: string) => {
  return join(base, path);
};

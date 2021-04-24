// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { request } from "gaxios";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.url !== "string") return;
  const result = await request<Readable>({
    url: req.query.url,
    method: (req.method as "GET") ?? "GET",
    data: req.body,
    headers: {
      "Cache-Control": "no-cache",
    },
    responseType: "stream",
  });
  result.data.pipe(res);
};

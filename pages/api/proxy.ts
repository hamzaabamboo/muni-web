// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios, { Method } from "axios";

export default async (req, res) => {
  const result = await axios(req.query.url, {
    method: (req.method ?? "GET") as Method,
    data: req.body,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  res.status(200).json(result.data);
};

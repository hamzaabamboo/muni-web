// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios, { Method } from "axios";
import { IncomingMessage } from "node:http";

export default async (req, res) => {
  const result = await axios(req.query.url, {
    method: (req.method ?? "GET") as Method,
    data: req.body,
  });
  res.status(200).json(result.data);
};

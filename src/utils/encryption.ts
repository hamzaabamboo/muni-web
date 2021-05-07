import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";
import { readFile } from "fs/promises";

export const decrypt = async (path: string) => {
  const encrypted = await readFile(path, "utf-8");
  const textParts = encrypted.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const key = createHash("sha256")
    .update(String(process.env.MAGIC))
    .digest("base64")
    .substr(0, 32);
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const encrypt = async (data: string) => {
  const key = createHash("sha256")
    .update(String(process.env.MAGIC))
    .digest("base64")
    .substr(0, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

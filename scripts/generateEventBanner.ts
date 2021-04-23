import { fixWeirdNumbering, getEventType } from "../src/api/utils";
import axios from "axios";
import { createCanvas, loadImage } from "canvas";
import { max } from "d3-array";
import { DateTime } from "luxon";
import { join } from "path";
import { Event } from "../src/@types/Event";

export const generateEventBanner = async (event: Event) => {
  const { id } = event;
  const imgUrl = join(__dirname, `../public/images/events/banner/${id}.png`);
  const bgUrl = join(__dirname, `../public/images/events/background/${id}.jpg`);
  const img = await loadImage(imgUrl);
  const bg = await loadImage(bgUrl);
  console.log(event.eventid, "done");
  const width = max([612, img.width]);
  const height = 315;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const imgWidth = 1 * img.width;
  const imgHeight = 1 * img.height;
  ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, img.width, height);
  ctx.putImageData(darken(imageData), 0, 0);
  const mt = 0;
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    getCenter([0, imgWidth], [0, width]),
    mt,
    imgWidth,
    imgHeight
  );
  ctx.font = "bold 30px Impact";
  const text = event.name;
  var textSize = ctx.measureText(text);
  ctx.fillStyle = "white";
  ctx.fillText(
    text,
    getCenter([0, textSize.width], [0, width]),
    mt + imgHeight + textSize.emHeightAscent + 20
  );
  const desc = `${DateTime.fromISO(event.startdate)
    .setZone("Asia/Tokyo")
    .toFormat("yyyy/MM/dd")} - ${DateTime.fromISO(event.enddate)
    .setZone("Asia/Tokyo")
    .toFormat("yyyy/MM/dd")} | ${Math.round(
    DateTime.fromISO(event.enddate)
      .diff(DateTime.fromISO(event.startdate))
      .as("hours")
  )} hours | ${getEventType(event)}`;
  ctx.font = "24px Impact";
  ctx.fillStyle = "white";
  var descSize = ctx.measureText(desc);
  ctx.fillText(
    desc,
    getCenter([0, descSize.width], [0, width]),
    mt + imgHeight + textSize.emHeightAscent + 20 + descSize.emHeightAscent + 20
  );
  return canvas.createPNGStream();
};

const getCenter = (
  img: [number, number],
  container: [number, number]
): number => {
  const wg = (container[1] - container[0] - (img[1] - img[0])) / 2;
  return wg;
};
const darken = <T extends { data: Uint8ClampedArray }>(
  id: T,
  amount: number = 0.7
) => {
  const data = id.data;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    data[i] = r * amount;
    data[i + 1] = g * amount;
    data[i + 2] = b * amount;
  }
  return id;
};

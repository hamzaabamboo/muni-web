export const sleep = (duration: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, duration));

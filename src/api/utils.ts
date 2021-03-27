export const getProxiedUrl = (url: string) => {
  if (process.env.NODE_ENV === "development") return "/api/proxy?url=" + url;
  if (url.match("projectdivar"))
    return "https://hambot.ham-san.net/d4dj/sig?url=" + url;
  if (url.match("d4-dj"))
    return "https://hambot.ham-san.net/d4dj/d4db?url=" + url;
  return url;
};

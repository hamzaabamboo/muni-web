export const getProxiedUrl = (url: string) => {
  if (process.env.NODE_ENV === "development")
    return (
      (process.env.NEXT_PUBLIC_BASE_URL || "") +
      "/api/proxy?url=" +
      encodeURIComponent(url)
    );
  if (url.match("projectdivar"))
    return "https://hambot.ham-san.net/d4dj/sig?url=" + encodeURIComponent(url);
  if (url.match("d4-dj"))
    return (
      "https://hambot.ham-san.net/d4dj/d4db?url=" + encodeURIComponent(url)
    );
  return url;
};

export const getProxiedUrl = (url: string) => {
  return process.env.NODE_ENV === "development"
    ? "/api/proxy?url=" + url
    : "https://hambot.ham-san.net/d4dj/sig?url=" + url;
};

const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

module.exports = {
  basePath: ghPages ? "/muni-web" : process.env.NEXT_PUBLIC_BASE_URL || "",
  future: {
    webpack5: true,
  },
  images: {
    domains: ["projectdivar.com"],
  },
};

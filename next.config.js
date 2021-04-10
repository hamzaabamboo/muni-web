const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

module.exports = {
  basePath: ghPages ? "/muni-web" : process.env.NEXT_PUBLIC_BASE_URL || "",
  future: {
    webpack5: true,
  },
  images: {
    domains: ["projectdivar.com"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // config.plugins.push(new WorkerPlugin());

    // Important: return the modified config
    return config;
  },
};

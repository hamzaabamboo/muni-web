const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

module.exports = {
  basePath: ghPages ? "/muni-web" : process.env.NEXT_PUBLIC_BASE_URL || "",
  future: {
    webpack5: true,
  },
  images: {
    domains: ["projectdivar.com"],
  },
  webpack: (config, { isServer, dev, webpack }) => {
    config.output.chunkFilename = isServer
      ? `${dev ? "[name]" : "[name].[fullhash]"}.js`
      : `static/chunks/${dev ? "[name]" : "[name].[fullhash]"}.js`;
    config.plugins.push(
      new webpack.ProvidePlugin({
        PIXI: "pixi.js",
        "pixi-spine": "pixi-spine",
      })
    );

    config.output.hotUpdateMainFilename =
      "static/webpack/[fullhash].[runtime].hot-update.json";

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

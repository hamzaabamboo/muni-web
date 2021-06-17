const withTM = require("next-transpile-modules")(["d3-time-format", "d3-time"]);
const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

module.exports = withTM({
  basePath: ghPages ? "/muni-web" : process.env.NEXT_PUBLIC_BASE_URL || "",
  images: {
    domains: ["projectdivar.com"],
  },
  webpack: (config, { isServer, dev, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        PIXI: "pixi.js",
        spine: "pixi-spine",
      })
    );
    return config;
  },
});

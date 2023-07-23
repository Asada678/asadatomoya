/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, "../asadatomoya-common"),
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};

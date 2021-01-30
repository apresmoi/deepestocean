// craco.config.js
const path = require("path");
const CracoEslintWebpackPlugin = require("craco-eslint-webpack-plugin");

const appSrc = path.resolve(".");

module.exports = {
  webpack: {
    alias: {
      "@assets": `${appSrc}/src/assets`,
      "@components": `${appSrc}/src/components/`,
      "@hooks": `${appSrc}/src/hooks`,
      "@layout": `${appSrc}/src/layout`,
      "@store": `${appSrc}/src/store`,
      "@utils": `${appSrc}/src/utils`,
    },
  },
  plugins: [
    {
      plugin: CracoEslintWebpackPlugin,
      options: {
        skipPreflightCheck: true,
        eslintOptions: {
          files: "src/**/*.{ts,tsx}",
          lintDirtyModulesOnly: true,
        },
      },
    },
    {
      plugin: require("craco-plugin-scoped-css"),
    },
  ],
};

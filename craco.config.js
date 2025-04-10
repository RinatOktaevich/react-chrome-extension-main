const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" &&
            require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs, // points to src/index.tsx (popup)
          ].filter(Boolean),
          content: path.resolve(__dirname, "src/chrome-services/content.ts"),
          background: path.resolve(__dirname, "src/chrome-services/background.ts"),
        },
        output: {
          ...webpackConfig.output,
          filename: "[name].js", // outputs main.js, content.js, background.js
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false, // must be false for Chrome extension
        },
        plugins: [
          // Replace original HtmlWebpackPlugin with separate ones
          new HtmlWebpackPlugin({
            inject: true,
            chunks: ["main"], // popup only
            template: paths.appHtml,
            filename: "popup.html",
          }),
            new MiniCssExtractPlugin()
        ],
      };
    },
  },
};

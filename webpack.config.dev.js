const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = env =>
  merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",

    devServer: {
    //   contentBase: "./dist",
      hot: true,
      open: true,
      compress: true,
      port: 3000,
    //   publicPath: "/",
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [new ReactRefreshWebpackPlugin()],
  });

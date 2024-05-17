const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  return {
    stats: "minimal",
    entry: "./src/index.ts",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },

    devServer: {
      compress: true,
      allowedHosts: "all",
      static: path.resolve(__dirname, "dist"),
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234,
      host: "0.0.0.0",
    },

    performance: { hints: false },

    devtool: argv.mode === "development" ? "eval-source-map" : undefined,

    optimization: {
      minimize: argv.mode === "production",
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: { drop_console: false },
            output: { comments: false, beautify: false },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          loader: "file-loader",
          options: {
            name: "assets/sounds/[name].[ext]",
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "assets/images/[name].[ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "assets/images", to: "assets/images" },
          { from: "assets/sounds", to: "assets/sounds" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        favicon: "./assets/favicon.ico",
        hash: true,
        minify: false,
      }),
    ],
  };
};

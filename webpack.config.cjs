const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  mode: process.env.NODE_ENV || "development",
  target: "web",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "image/[name][ext]",
    publicPath: process.env.PUBLIC_PATH || "auto",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "nav",
      filename: "remoteEntry.js",
      exposes: {
        "./Navbar": "./src/components/Navbar.tsx",
        "./Footer": "./src/components/Footer.tsx",
      },
      remotes: {
        store_remote: `store_remote@${process.env.STORE_REMOTE_URL}`,
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^19.1.1" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^19.1.1",
        },
        "react-router-dom": { singleton: true, eager: true },
        "react-redux": { singleton: true, eager: true },
        "@reduxjs/toolkit": { singleton: true, eager: true },
      },
    }),
    new webpack.DefinePlugin({
      "process.env.STORE_REMOTE_URL": JSON.stringify(
        process.env.STORE_REMOTE_URL
      ),
      "process.env.PUBLIC_PATH": JSON.stringify(process.env.PUBLIC_PATH),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.scss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

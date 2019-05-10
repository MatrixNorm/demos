const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildId = process.env.JS_BUILD_ID;
const builds = {};

builds.hello = function(env) {
  const outputPath = env.development ? "jsdev/hello" : "docs/js/hello";
  const mode = env.development ? "development" : "production";
  console.log(outputPath, mode)
  return {
    entry: {
      main: "./srcjs/hello/main.js",
      "service-worker": "./srcjs/hello/service-worker.js"
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      //publicPath: "/",
      filename: "[name].js"
    },
    mode: mode,
    devServer: {
      contentBase: "jsdev/hello"
    },
    plugins: [
      new HtmlWebpackPlugin({
        excludeChunks: ["service-worker"]
      })      
    ]
  };
}

module.exports = env => {
  const onBadBuild = function() { 
    console.log(`No build with id ${buildId}`) 
  };
  return (builds[buildId] || onBadBuild)(env);
}
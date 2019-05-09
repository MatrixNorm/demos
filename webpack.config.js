const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const builds = {};

builds.hello = function(env) {
  const outputPath = env.development ? "jsdev/hello" : "docs/js/hello";
  const mode = env.development ? "development" : "production";
  console.log(outputPath, mode)
  return {
    entry: "./srcjs/hello/main.js",
    output: {
      path: path.resolve(__dirname, outputPath),
      //publicPath: "/",
      filename: "main.js"
    },
    mode: mode,
    devServer: {
      contentBase: "jsdev/hello"
    },
    plugins: [
      new HtmlWebpackPlugin()
    ]
  };
}

module.exports = env => {
  console.log(env)
  return builds[env.build](env);
}
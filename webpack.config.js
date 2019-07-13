const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const builds = {};

const basedBuild = buildId => overrides => env => {
  const outputPath = env.development ? `jsdev/${buildId}` : `docs/js/${buildId}`;
  const mode = env.development ? "development" : "production";
  return Object.assign({
    entry: {
        "main": `./srcjs/${buildId}/main.js`
    },
    output: {
        path: path.resolve(__dirname, outputPath),
        //publicPath: "/",
        filename: "[name].js"
    },
    mode: mode,
    devServer: {
        contentBase: `jsdev/${buildId}`
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
  }, overrides);
};

builds.hello = basedBuild('hello')({
    entry: {
      "main": "./srcjs/hello/main.js",
      "service-worker": "./srcjs/hello/service-worker.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        excludeChunks: ["service-worker"]
      })
    ]
});

builds.graphql_hello = basedBuild('graphql_hello')({});

//builds.hello = function (env) {
//  const outputPath = env.development ? "jsdev/hello" : "docs/js/hello";
//  const mode = env.development ? "development" : "production";
//  console.log(outputPath, mode)
//  return {
//    entry: {
//      "main": "./srcjs/hello/main.js",
//      "service-worker": "./srcjs/hello/service-worker.js"
//    },
//    output: {
//      path: path.resolve(__dirname, outputPath),
//      //publicPath: "/",
//      filename: "[name].js"
//    },
//    mode: mode,
//    devServer: {
//      contentBase: "jsdev/hello"
//    },
//    plugins: [
//      new HtmlWebpackPlugin({
//        excludeChunks: ["service-worker"]
//      })
//    ]
//  };
//}

//builds.graphql_hello = function (env) {
//  const outputPath = env.development ? "jsdev/graphql_hello" : "docs/js/graphql_hello";
//  const mode = env.development ? "development" : "production";
//  console.log(outputPath, mode)
//  return {
//    entry: {
//      "main": "./srcjs/graphql_hello/main.js"
//    },
//    output: {
//      path: path.resolve(__dirname, outputPath),
//      //publicPath: "/",
//      filename: "[name].js"
//    },
//    mode: mode,
//    devServer: {
//      contentBase: "jsdev/graphql_hello"
//    },
//    plugins: [
//      new HtmlWebpackPlugin()
//    ]
//  };
//}

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;
  const onBuildNotFound = function () {
    console.log(`No build with id ${buildId}\n env: ${env}`)
  };
  return (builds[buildId] || onBuildNotFound)(env);
}
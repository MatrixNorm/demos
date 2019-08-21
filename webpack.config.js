const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const builds = {};

const basedBuild = buildId => overrides => env => {
  const outputPath = env.development? 
                        `jsdev/${buildId}`:
                        `docs/js/${buildId}`;
  const mode = env.development? "development" : "production";
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

builds.typescript_babel_hello = basedBuild('typescript_babel_hello')({
  entry: {
    "main": `./srcjs/typescript_babel_hello/main.ts`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
      rules: [{
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
      }],
  }
});

const relayOverides = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    // https://github.com/graphql/graphql-js/issues/1272#issuecomment-377384574
    extensions: ['.mjs', '.js', '.jsx']
  },
};

builds.relay_hello = basedBuild('relay_hello')(relayOverides);
builds.relay_pagination_demo = basedBuild('relay_pagination_demo')(relayOverides);

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;
  const onBuildNotFound = function () {
    console.log(`No build with id ${buildId}\n env: ${env}`)
  };
  return (builds[buildId] || onBuildNotFound)(env);
}
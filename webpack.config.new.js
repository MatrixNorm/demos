const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const builds = {};

const baseBuild = ({ buildId }) => {
  return [env => {
    const outputPath = env.development? 
                          `jsdev/${buildId}`:
                          `docs/js/${buildId}`;
    const mode = env.development? "development" : "production";
    return {
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
    };
  }]
};

builds.hello = 
  baseBuild({buildId: 'hello'})
  .concat(env => ({
    entry: {
      "main": "./srcjs/hello/main.js",
      "service-worker": "./srcjs/hello/service-worker.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        excludeChunks: ["service-worker"]
      })
    ]
  }))
  

builds.graphql_hello = 
  baseBuild({buildId: 'graphql_hello'});

builds.typescript_babel_hello = 
  basedBuild('typescript_babel_hello')
  .concat(env => ({
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
  }));

builds.relay_hello = basedBuild('relay_hello')({
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
});

builds.relay_hello = basedBuild('relay_pagination_demo')({
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
});

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;
  const onBuildNotFound = function () {
    console.log(`No build with id ${buildId}\n env: ${env}`)
  };
  return (builds[buildId] || onBuildNotFound)(env);
}

const exec = (build, env) => {
  return build.reduce(function(curr, next) {
    Object.assign(curr(env), next(env))
  }, {})
}
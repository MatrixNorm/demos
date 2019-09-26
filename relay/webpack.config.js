/* global require */
/* global module */
/* global process */
/* global __dirname */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// function PP(obj) {
//   console.log(util.inspect(obj, {showHidden: false, depth: null}))
// }

const builds = {};

const baseBuild = ({ buildId }) => env => {

  const outputPath = 
    env.development? 
      `jsdev/${buildId}`:
      `docs/js/${buildId}`;

  const mode = env.development? "development" : "production";

  return {
    entry: {
        "main": `./src/${buildId}/main.js`
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
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }        
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        }
      ],
    }
  };
};

function registerBuild(buildId) {
  builds[buildId] = baseBuild({ buildId })
}

registerBuild('relay_hello')
registerBuild('relay_pagination_demo')
registerBuild('relay_pagination_demo2')
registerBuild('hooks_vs_render_props')
registerBuild('generators_and_stuff')
registerBuild('problem_numero_one')

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;

  const onBuildNotFound = function () {
    console.log(`No build with id ${buildId}\n env: ${env}`)
  };

  const build = builds[buildId];
  if ( !build ) {
    return onBuildNotFound(env);
  }
  return build(env)
}
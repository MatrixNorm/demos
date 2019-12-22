/* global require */
/* global module */
/* global process */
/* global __dirname */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const builds = {};

const baseBuild = ({ buildId }) => env => {
  const outputPath = env.development
    ? `jsdev/${buildId}`
    : `docs/js/${buildId}`;

  const mode = env.development ? "development" : "production";

  return {
    entry: {
      main: `./src/${buildId}/main.js`
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: "[name].js",
      publicPath: "/"
    },
    mode: mode,
    devServer: {
      //contentBase: `jsdev/${buildId}`,
      publicPath: "/",
      historyApiFallback: true
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: `src/${buildId}/index.html`
      })
    ],
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
      alias: {
        theapp: path.resolve(__dirname, `src/${buildId}/`),
        theproject: path.resolve(__dirname, `src/`)
     }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                ["@babel/preset-env", { targets: { chrome: "76" } }],
                "@babel/preset-flow"
              ],
              plugins: [
                [
                  "relay",
                  {
                    artifactDirectory: `./src/${buildId}/__generated__`
                  }
                ],
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator"
              ]
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /(graphql-tools|deprecated-decorator|xstate)/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
        {
          test: /\.css$/,
          //exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  };
};

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;
  const build = baseBuild({ buildId })
  return build(env);
};

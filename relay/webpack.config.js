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
      filename: "[name].js"
    },
    mode: mode,
    devServer: {
      contentBase: `jsdev/${buildId}`
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: `src/${buildId}/index.html`
      })
    ],
    resolve: {
      extensions: [".mjs", ".js", ".jsx"]
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
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  };
};

function registerBuild(buildId) {
  builds[buildId] = baseBuild({ buildId });
}

registerBuild("relay_hello");
registerBuild("pagination_demo_0/demo1");
registerBuild("pagination_demo_0/demo2");
registerBuild("hooks_vs_render_props");
registerBuild("generators_and_stuff");
registerBuild("problem_numero_one");
registerBuild("problem_connection_fragment");
registerBuild("problem_connection_fragment2");
registerBuild("graphiql_demo");

module.exports = env => {
  const buildId = process.env.JS_BUILD_ID;

  const onBuildNotFound = function() {
    console.log(`No build with id ${buildId}\n env: ${env}`);
  };

  const build = builds[buildId];
  if (!build) {
    return onBuildNotFound(env);
  }
  return build(env);
};

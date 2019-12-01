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

function registerBuild(buildId) {
  builds[buildId] = baseBuild({ buildId });
}

registerBuild("cities_app");
registerBuild("connection_and_store/demo1");
registerBuild("connection_and_store/demo2");
registerBuild("connection_and_store/normalization_without_ids");
registerBuild("flow_fragmentrefs");
registerBuild("graphiql_demo");
registerBuild("indexeddb/demo1");
registerBuild("indexeddb/uploading_json");
registerBuild("js_lang/async_iter");
registerBuild("js_lang/generators_and_stuff");
registerBuild("js_lang/observable");
registerBuild("local_state/demo1");
registerBuild("local_state/demo2");
registerBuild("local_state/demo3");
registerBuild("local_state/schema_stitching");
registerBuild("local_state/two_environments");
registerBuild("pagination_demo_0/demo1");
registerBuild("pagination_demo_0/demo2");
registerBuild("problem_numero_one");
registerBuild("problem_connection_fragment");
registerBuild("problem_connection_fragment2");
registerBuild("react/hooks_vs_render_props");
registerBuild("react/setstate_and_props");
registerBuild("react_router/demo1");
registerBuild("relay_hello");
registerBuild("ui/autosuggest");
registerBuild("ui/suggestion_list");
registerBuild("ui/suggestion_list_loading_on_typing");
registerBuild("ui/uncontrolled_input");
registerBuild("xstate/debounce");

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

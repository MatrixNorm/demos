/* global require */
/* global module */
/* global process */
/* global __dirname */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseBuild = ({ buildId }) => env => {
  const outputPath = env.development
    ? `jsdev/${buildId}`
    : `docs/js/${buildId}`;

  const mode = env.development ? "development" : "production";
  const lang = process.env.LANG;

  return {
    target: "node",
    entry: {
      main: `./src/${buildId}/main.${lang === "ts" ? "tsx" : "js"}`
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: "[name].js",
      publicPath: "/"
    },
    mode: mode,
    devServer: {
      contentBase: [`./src/${buildId}`],
      publicPath: "/",
      //historyApiFallback: true,
      //watchContentBase: true
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: `./src/${buildId}/index.html`
      })
    ],
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      alias: {
        theapp: path.resolve(__dirname, `src/${buildId}/`),
        theproject: path.resolve(__dirname, `src/`)
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                ["@babel/preset-env", { targets: { chrome: "76" } }],
                "@babel/typescript"
              ],
              plugins: [
                // [
                //   "relay",
                //   {
                //     artifactDirectory: `./src/__relay__`
                //   }
                // ],
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
  const build = baseBuild({ buildId });
  return build(env);
};

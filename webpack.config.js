const path = require('path');
const util = require('util')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function PP(obj) {
  console.log(util.inspect(obj, {showHidden: false, depth: null}))
}

const builds = {};

const baseBuild = ({ buildId }) => env => {

  const outputPath = 
    env.development? 
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
};

// const basedBuild = buildId => overrides => env => {
//   const outputPath = env.development? 
//                         `jsdev/${buildId}`:
//                         `docs/js/${buildId}`;
//   const mode = env.development? "development" : "production";
//   return Object.assign({
//     entry: {
//         "main": `./srcjs/${buildId}/main.js`
//     },
//     output: {
//         path: path.resolve(__dirname, outputPath),
//         //publicPath: "/",
//         filename: "[name].js"
//     },
//     mode: mode,
//     devServer: {
//         contentBase: `jsdev/${buildId}`
//     },
//     devtool: 'source-map',
//     plugins: [
//         new HtmlWebpackPlugin()
//     ]
//   }, overrides);
// };

// builds.hello = basedBuild('hello')({
//     entry: {
//       "main": "./srcjs/hello/main.js",
//       "service-worker": "./srcjs/hello/service-worker.js"
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         excludeChunks: ["service-worker"]
//       })
//     ]
// });

// builds.graphql_hello = basedBuild('graphql_hello')({});

const typescriptMixin = ({ buildId }) => ({
  entry: {
    "main": `./srcjs/${buildId}/main.ts`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/typescript'
            ]
          }
        }        
      }
    ],
  }
});

builds.typescript_babel_hello = (() => {
  const buildId = 'typescript_babel_hello';
  return [
    baseBuild({ buildId }),
    typescriptMixin({ buildId })
  ];
})();

const flowMixin = () => ({
  resolve: {
    extensions: ['.mjs', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-flow'
            ],
            plugins: [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-chaining"
            ]
          }
        }        
      }
    ],
  }
});

builds.flow_babel_hello = [
  baseBuild({ buildId: 'flow_babel_hello' }),
  flowMixin()
];

const relayMixin = () => {
  let x = flowMixin();

  let plugins = x.module.rules[0].use.options.plugins;
  plugins.unshift('relay');

  let presets = x.module.rules[0].use.options.presets;
  presets.unshift('@babel/preset-react');

  x.module.rules[0].use.options.plugins = plugins;
  x.module.rules[0].use.options.presets = presets;

  return x;
};

builds.relay_hello = [
  baseBuild({ buildId: 'relay_hello' }),
  relayMixin()
];

builds.relay_pagination_demo = [
  baseBuild({ buildId: 'relay_pagination_demo' }),
  relayMixin()
];

module.exports = env => {

  const buildId = process.env.JS_BUILD_ID;

  const onBuildNotFound = function () {
    console.log(`No build with id ${buildId}\n env: ${env}`)
  };

  const buildsChain = builds[buildId];
  if ( !buildsChain ) {
    return onBuildNotFound(env);
  }
  let finalConfig = {};
  for (let build of buildsChain) {
    if (typeof build === 'function') {
      finalConfig = Object.assign(finalConfig, build(env))
    } 
    else {
      finalConfig = Object.assign(finalConfig, build)
    }
  }
  PP(finalConfig)
  return finalConfig;
}
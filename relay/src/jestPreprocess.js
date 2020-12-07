/* globals module require */

const babelOptions = {
  presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { chrome: "76" } }]],
  plugins: [
    "relay",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};

module.exports = require("babel-jest").createTransformer(babelOptions);

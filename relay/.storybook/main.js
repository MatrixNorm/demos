const path = require("path");

module.exports = {
  stories: [
    `../src/${process.env.APP_DIR}/**/*.stories.tsx`,
    `../src/${process.env.APP_DIR}/**/*.stories.js`,
  ],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: (config) => {
    let plugins = config.module.rules[0].use[0].options.plugins;
    config.module.rules[0].use[0].options.plugins = [
      [
        "relay",
        {
          artifactDirectory: `./src/__relay__`,
        },
      ],
      "@babel/plugin-proposal-optional-chaining",
      ...plugins,
    ];

    config.module.rules[0].use[0].options.presets = [
      "@babel/preset-react",
      ["@babel/preset-env", { targets: { chrome: "76" } }],
      "@babel/typescript",
    ];

    config.module.rules[0].test = /\.(ts|tsx|js|jsx|mjs)$/;

    config.resolve.extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];
    config.resolve.alias = {
      ...config.resolve.alias,
      projroot: path.resolve(__dirname, `../src/`),
    };

    console.dir(config, { depth: null });
    return config;
  },
};

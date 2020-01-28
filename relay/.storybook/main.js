module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: config => {
    let plugins = config.module.rules[0].use[0].options.plugins;
    config.module.rules[0].use[0].options.plugins = [
      [
        "relay",
        {
          artifactDirectory: `./src/__relay__`
        }
      ],
      "@babel/plugin-proposal-optional-chaining",
      ...plugins
    ];

    config.module.rules[0].use[0].options.presets = [
      "@babel/preset-react",
      ["@babel/preset-env", { targets: { chrome: "76" } }],
      "@babel/typescript"
    ];

    config.module.rules[0].test = /\.(ts|tsx|js|jsx|mjs)$/;

    config.resolve.extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];
    //config.resolve.alias['']

    console.dir(config, { depth: null });
    return config;
  }
};

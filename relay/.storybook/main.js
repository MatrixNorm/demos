module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: config => {
    let plugins = config.module.rules[0].use[0].options.plugins;
    let presets = config.module.rules[0].use[0].options.presets;
    plugins.push("@babel/plugin-proposal-optional-chaining");
    plugins.push([
      "relay",
      {
        artifactDirectory: `./src/__relay__`
      }
    ]);
    presets.push("@babel/typescript");
    console.dir(config, { depth: null });
    return config;
  }
};

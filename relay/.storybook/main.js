module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: config => {
    let plugins = config.module.rules[0].use[0].options.plugins;
    plugins.push("@babel/plugin-proposal-optional-chaining");
    plugins.push([
      "relay",
      {
        artifactDirectory: `./${process.env.RELAY_GEN_DIR}/__generated__`
      }
    ]);
    console.dir(plugins, { depth: null });
    return config;
  }
};

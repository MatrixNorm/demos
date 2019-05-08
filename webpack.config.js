const path = require('path');

const builds = {};

builds.hello = function(env) {
  const outputPath = env.development ? "jsdev/hello" : "docs/js/hello";
  return {
    entry: "./srcjs/hello/main.js",
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: "main.js"
    }
  };
}

module.exports = env => {
  return builds[env.build](env);
}
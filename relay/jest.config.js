/* globals module */

module.exports = {
  verbose: true,
  transform: { '^.+\\.js$': './src/jestPreprocess.js' },
};
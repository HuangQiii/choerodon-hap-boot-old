const getWebpackCommonConfig = require('./getWebpackCommonConfig');

function updateWebpackConfig(mode) {
  const webpackConfig = getWebpackCommonConfig();
  if (mode === 'start') {
    webpackConfig.devtool = 'cheap-module-eval-source-map';
  }
  return webpackConfig;
}

module.exports = updateWebpackConfig;
#! /usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const install = require('./common/install');
const entryRouter = require('./common/entryRouter');
const updateWebpackConfig = require('../config/updateWebpackConfig');
const installSubmoduleDependencies = require('./common/installSubmoduleDependencies');

function run() {
  const output = './dist';
  const port = 2233;
  const webpackConfig = updateWebpackConfig('start');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const serverOptions = {
    quiet: true,
    hot: true,
    noInfo: false,
    contentBase: path.join(process.cwd(), output),
    historyApiFallback: true,
    host: 'localhost',
    open: true,
    proxy: [{
      context: ['**', '!/', '!/assets/**', '!/main.js'],
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      autoRewrite: true,
    }],
  };

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverOptions);

  const compiler = webpack(webpackConfig);

  const server = new WebpackDevServer(compiler, serverOptions);
  server.listen(port, '0.0.0.0', () => { });
}

function dev() {
  // 只有开发其他模块时，才采用这条命令
  // 开发core模块，直接npm run core

  install(() => {
    entryRouter();
  
    installSubmoduleDependencies(() => run());
  });
}

dev();

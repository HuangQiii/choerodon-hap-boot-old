#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const install = require('./common/install');
const updateWebpackConfig = require('../config/updateWebpackConfig');

function run() {
  const output = {
    filename: 'bundle.js',
    path: path.join(__dirname,
      '..', '..', '..', '..', '..',
      'lib', 'dist'),
  };
  const webpackConfig = updateWebpackConfig();
  webpackConfig.output = output;
  webpackConfig.mode = 'production';
  webpack(webpackConfig, (err, stats) => {
    // copyHtmlTemplate();
  });
}

function copyHtmlTemplate() {
  const htmlTemplatePath = path.join(__dirname,
    '..', '..', '..', '..', '..',
    'lib', 'dist', 'index.html');
  const targetPath = path.resolve(process.cwd(), '..', 'index.html');

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  if (fs.existsSync(htmlTemplatePath)) {
    fs.copyFileSync(htmlTemplatePath, targetPath);
  }
}

function dist() {
  install(() => {
    run();
  });
}

dist();

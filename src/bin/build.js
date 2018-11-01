#! /usr/bin/env node

const path = require('path');
const webpack = require('webpack');

const install = require('./common/install');
const entryRouter = require('./common/entryRouter');
const updateWebpackConfig = require('../config/updateWebpackConfig');
const installSubmoduleDependencies = require('./common/installSubmoduleDependencies');

function run() {
  const output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 
      '..', '..', '..', '..', '..',
      'src', 'main', 'webapp', 'lib', 'dist',
    ),
  };
  const webpackConfig = updateWebpackConfig();
  webpackConfig.output = output;
  webpackConfig.mode = 'production';
  webpackConfig.devtool = 'none';
  webpack(webpackConfig, (err, stats) => {
    if (err !== null) {
    } else if (stats.hasErrors()) {
    }
    // copyHtmlTemplate();
  });
}

function copyHtmlTemplate() {
  const htmlTemplatePath = path.join(__dirname,
  '..', '..', '..', '..',
  'lib', 'dist', 'index.html',
  );
  const targetPath = path.resolve(process.cwd(), '..');

  if(!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  if (fs.existsSync(htmlTemplatePath)) {
    fs.copySync(htmlTemplatePath, targetPath);
  } else {
    console.error(
      `Could not copy htmlTemplate`
    );
    return;
  }
  console.log('Copy htmlTemplate success!');
}


function build() {

  install(() => {

    entryRouter();
  
    installSubmoduleDependencies(() => run());
  });
}

build();
function getBabelCommonConfig() {
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-syntax-dynamic-import'],
      ['transform-class-properties'],
      ['import', { libraryName: 'choerodon-ui', libraryDirectory: 'lib', style: true }, 'choerodon-ui'],
      ['import', { libraryName: 'choerodon-hap-ui', libraryDirectory: 'lib', style: true }, 'choerodon-hap-ui'],
    ],
  };
}

module.exports = getBabelCommonConfig;

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const getAllSubmoduleRouter = require('./getAllSubModulesRouter');
const getWorkspaceMsg = require('./getWorkspaceMsg');

/**
 * 初始化router入口文件
 * !!!!!!!!!!!!!需要优化，根据nunjucks写模板，不要手动插入数据
 * @param {*} routerMapping 
 */
function importRouter(routerMap) {
  // const routerMapping = routerMap.filter(v => v.folderName && !v.folderName.startWith('hap-core'));
  const routerMapping = routerMap;
  const workspaceMsg = getWorkspaceMsg();
  const { workspaceName, workspaceEntry } = workspaceMsg;

  const indexPath = path.join(process.cwd(), '.', 'src', 'AutoRouter.js');

  let str = `import React, { Component } from 'react';
import { CacheRoute, CacheSwitch } from './containers/components/cache';
import IFRAMEINDEX from './containers/components/iframeWrapper';
import WORKSPACEINDEX from '../../../../src/main/webapp/WEB-INF/view/react/${workspaceEntry.slice(2)}';
`;

  /* eslint-disable */
  for (var v in routerMapping) {
    if (v.folderName && !v.folderName.startWith('hap-core')) {
      const fileName = routerMapping[v].entryRouter.slice(6).split('.')[0];
      const path = routerMapping[v].entryRouter.slice(2);
      str = str + `import ${fileName} from '../../${v.folderName}/${path}';` + os.EOL;
    }
  }

  str = str + `export default class AutoRouter extends Component {
  render() {
    return (
      <CacheSwitch>
      <CacheRoute exact path='/${workspaceName.split('-')[1]}' component={WORKSPACEINDEX} /> 
  `;

  for (var v in routerMapping) {
    if (v.folderName && !v.folderName.startWith('hap-core')) {
      const fileName = routerMapping[v].entryRouter.slice(6).split('.')[0];
      const path = v.folderName.split('-')[1];
      str = str + `       <CacheRoute exact path='/${path}' cacheKey="${path}" component={${fileName}} />` + os.EOL;
    }
  }

  str = str + 
`     <CacheRoute exact path='/iframe/:name' component={IFRAMEINDEX} /> 
      </CacheSwitch>
    );
  }
}`;
  /* eslint-enable */
  fs.writeFileSync(indexPath, str);
}

/**
 * 获取所有模块的名字与router入口路径
 * 获取完成后执行入口文件初始化
 */
function entryRouter() {
  getAllSubmoduleRouter(importRouter);
}

module.exports = entryRouter;

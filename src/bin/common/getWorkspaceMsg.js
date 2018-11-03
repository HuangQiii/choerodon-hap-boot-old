const path = require('path');

/**
 * 获取工作目录相关信息
 * return {
 *    workspacePkgPath，  工作目录下的pkg.json
 *    workspaceName,      工作目录名
 *    workspaceEntry,     工作目录路由入口路径
 * }
 */
function getWorkspaceMsg() {
  const workspacePkgPath = path.join(process.cwd(),
    '..', '..', '..',
    'src', 'main', 'webapp', 'WEB-INF', 'view', 'react', 'package.json');

  const workspacePkg = require(workspacePkgPath);
  const workspaceName = workspacePkg.name;
  const workspaceEntry = workspacePkg.main;

  return {
    workspacePkgPath,
    workspaceName,
    workspaceEntry,
  };
}

module.exports = getWorkspaceMsg;

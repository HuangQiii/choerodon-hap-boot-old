const fs = require('fs');
const path = require('path');

/**
 * 获取generate-react目录下的模块名
 * （默认该目录下全为依赖模块）
 * 返回模块名数组
 */
function getSubmodule() {
  const components = [];
  const cmpsPath = path.join(
    process.cwd(), '..', '..', 'generate-react',
  );
  const files = fs.readdirSync(cmpsPath);
  
  files.forEach((item) => {
    const stat = fs.lstatSync(`../../generate-react/${item}`);
    if (stat.isDirectory() === true) {
      components.push(item);
    }
  });

  return components;
}

module.exports = getSubmodule;

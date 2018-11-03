const fs = require('fs');
const path = require('path');
const getAllSubModules = require('./getAllSubModules');

const routerMapping = {};

/**
 * 获得依赖模块的模块与路径对象
 * return { moduleName: routerPath }
 * @param {*} cb callback
 */
function getSubmoduleRouter(cb) {
  const cmps = getAllSubModules();
  cmps.forEach((cmp, index) => {
    const cmpPkgPath = path.join(
      process.cwd(), '..', cmp, 'package.json',
    );

    fs.exists(cmpPkgPath, (exists) => {
      if (exists) {
        const cmpPkg = require(cmpPkgPath);

        routerMapping[cmpPkg.name] = {
          folderName: cmp,
          entryPath: cmpPkg.main,
        };

        if (index === cmps.length - 1) {
          cb(routerMapping);
        }
      }
    });
  });
}

module.exports = getSubmoduleRouter;

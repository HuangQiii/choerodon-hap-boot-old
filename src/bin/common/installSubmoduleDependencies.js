const fs = require('fs-extra');
const path = require('path');
const getAllSubModules = require('./getAllSubModules');
const install = require('./install');

function getDependenciesByModules(dependencies) {
  const deps = {};
  const cmps = getAllSubModules();
  cmps.forEach((cmp) => {
    const cmpPkgPath = path.join(
      process.cwd(), '..', cmp, 'package.json',
    );

    fs.exists(cmpPkgPath, (exists) => {
      if (exists) {
        const cmpPkg = require(cmpPkgPath);
        Object.assign(deps, cmpPkg[dependencies]);
      }
    });
  });

  return deps;
}

/**
 * 合并所有依赖的模块中的依赖到当前pkg.json下
 * 安装依赖
 * @param {*} cb callback，依赖安装完执行
 */
function installSubmoduleDependencies(cb) {
  const mainPackagePath = path.join(process.cwd(), '.', 'package.json');
  const mainPackage = require(mainPackagePath);

  mainPackage.dependencies = Object.assign(
    getDependenciesByModules('dependencies'), 
    mainPackage.dependencies,
  );
  mainPackage.peerDependencies = Object.assign(
    getDependenciesByModules('peerDependencies'),
    mainPackage.peerDependencies,
  );
  
  fs.writeFileSync(
    mainPackagePath,
    JSON.stringify(mainPackage),
  );

  install(() => cb(mainPackage));
}

module.exports = installSubmoduleDependencies;

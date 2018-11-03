const spawn = require('cross-spawn');

/**
 * 执行`npm i`安装依赖
 * @param {*} cb callback 安装依赖完成后回调
 */
function install(cb) {
  const child = spawn('npm', ['i'], { stdio: 'inherit' });
  child.on('close', (code) => {
    cb(code);
  });
}

module.exports = install;

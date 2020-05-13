const welcome = require('cli-welcome');
const checkNode = require('cli-check-node');
const pkgJSON = require('./package.json');
const unhandledError = require('cli-handle-unhandled');

module.exports = async () => {
  unhandledError();
  checkNode(`10`);
  welcome(`github-trending-cli`, `by Mohamed Dounnani\n${pkgJSON.description}`, {
    bgColor: `#81EF96`,
    color: `#FFFFFF`,
    bold: true,
    clear: true,
    version: `v${pkgJSON.version}`
  });
};
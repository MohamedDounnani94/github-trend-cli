const meow = require('meow');
const chalk = require('chalk');
const Table = require('cli-table3');

const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const blue = chalk.blue;

const table = new Table({
  head: [green('Command'), green('Language'), green('Since'), green('SpokenLanguage')]
})

table.push(
  ['github-trend-cli', 'JavaScript', 'dialy', 'en'],
  ['github-trend-cli', 'JavaScript', 'weekly', 'any'],
  ['github-trend-cli', 'any', 'dialy', 'monthly'],
)

module.exports = meow(
  `
Usage
  ${green(`github-trend-cli`)} ${cyan(`<language>`)} ${blue(`<since>`)} ${yellow(`<spokenLanguage>`)}
Commands
  ${cyan(`language`)}           Language of repo (Java, JavaScript, Python, ...)
  ${cyan(`since`)}              Dialy, Weekly or Monthly
  ${cyan(`spokenLanguage`)}     Spoken Language (en, fr, ...)
Additional Commands
  ${green('github-trend-cli')} ${cyan('help')}
Examples
${table.toString()}
`,
  {
    booleanDefault: undefined,
    hardRejection: false,
    inferType: false,
    flags: {
      all: {
        type: 'boolean',
        default: false,
        alias: 'a'
      }
    }
  }
);
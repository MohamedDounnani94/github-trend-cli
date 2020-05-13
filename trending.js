const Table = require('cli-table3')
const fetch = require('./api/fetch')
const chalk = require('chalk')
const _ = require('lodash')

const green = chalk.green

const table = new Table({
  head: [green('Author'), green('Repository'), green('Url'), green('Description'), green('Language'), green('Stars')]
})

module.exports = async function (language, since, spokenLanguage) {
  const results = await fetch.fetchRepositories({
    language,
    since,
    spokenLanguage
  })
  table.push(
    ..._.map(results, ({author, repositoryName, url, description, language, stars}) => [author, repositoryName, url, description, language, stars])
  )

  console.log(table.toString())
};
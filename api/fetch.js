const cheerio = require('cheerio');
const fetch = require('node-fetch');
const _ = require('lodash');
const chalk = require('chalk');

const GITHUB_URL = 'https://github.com';
const red = chalk.red;

async function fetchRepositories({
  language = '',
  since = 'daily',
  spokenLanguage = '',
} = {}) {
  if(language === 'any') language = ''
  if(since === 'any') since = 'daily'
  if(spokenLanguage === 'any') spokenLanguage = ''
  const url = `${GITHUB_URL}/trending/${language}?since=${since}&spoken_language_code=${spokenLanguage}`
  try {
    const data = await fetch(url)
    const _cheerio = cheerio.load(await data.text())
    return (
      _cheerio('.Box article.Box-row')
        .get()
        .map((repository) => {
          const repo = _cheerio(repository)
          const title = repo.find('.h3').text().trim()
          const [author, repositoryName] = title.split('/').map((v) => v.trim())
          const relativeUrl = repo.find('.h3').find('a').attr('href')
          const langNode = repo.find('[itemprop=programmingLanguage]')
          const lang = langNode.length ? langNode.text().trim() : null
          const description = repo.find('p.my-1').text().trim() || ''
          const stars = parseInt(
            repo
              .find(".mr-3 svg[aria-label='star']")
              .first()
              .parent()
              .text()
              .trim()
              .replace(',', '') || 0,
            10
          )
          return _.omitBy({
            author,
            repositoryName,
            url: `${GITHUB_URL}${relativeUrl}`,
            description: _.truncate(description, { length: 40 }),
            language: lang,
            stars,
          }, _.isNil)
        })
    );
  } catch (err) {
    console.log(red(err))
  }
}


module.exports = { fetchRepositories };
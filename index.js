#!/usr/bin/env node
const cli = require('./cli');
const start = require('./start');
const trending = require('./trending');

(async () => {
  const input = cli.input;

  start()

  if(input[0] === 'help' || input.length < 2) {
    cli.showHelp(0)
  }


  const [language, since, spokenLanguage] = cli.input

  console.log('Loading...')

  await trending(language, since, spokenLanguage);

})();


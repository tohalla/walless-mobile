const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');

const set = require('lodash/fp').set;

const url = `http://localhost:8080/translation/`;

module.exports =
  fetch(url)
    .then(locales => locales.json())
    .then(locales =>
      locales.reduce(
        (prev, curr) =>
          Object.assign({}, prev, {[curr.language_short_code]:
            fetch(`${url}${curr.language_short_code}`)
              .then(translations => translations.json())
              .then(translations =>
                Object.keys(translations).reduce(
                  (prev, curr) => set(curr)(translations[curr])(prev),
                  {}
                )
              )
          }),
        {}
      )
    )
    .then(locales =>
      Promise.all(Object.values(locales)).then(translations => fs.writeFile(
        path.resolve(__dirname, 'src', 'translations.json'),
        JSON.stringify(
          translations.reduce((prev, curr, i) =>
            Object.assign({}, prev, {[Object.keys(locales)[i]]: curr}),
            {}
          )),
        err => {}
      ))
    );

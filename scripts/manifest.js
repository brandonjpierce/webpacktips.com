const path = require('path');
const map = require('lodash/map');
const keys = require('lodash/keys');
const last = require('lodash/last');
const split = require('lodash/split');
const orderBy = require('lodash/orderBy');
const parser = require('front-matter');
const { walk } = require('walk');
const { readFile, writeFile } = require('../src/utils');

const manifest = {};
const tipsDir = path.resolve('tips');
const manifestDir = path.resolve('manifests');
const walker = walk(tipsDir);

walker.on('directory', (root, stats, next) => {
  manifest[stats.name] = [];
  next();
});

walker.on('file', async (root, stats, next) => {
  const lang = last(split(root, path.sep));
  const filePath = path.join(root, stats.name);
  const content = await readFile(filePath, 'utf8');
  const identifier = stats.name.slice(0, -3);
  const { attributes } = parser(content);

  manifest[lang].push({
    route: identifier,
    title: attributes.title,
    date: attributes.date
  });

  next();
});

walker.on('end', async () => {
  const langs = keys(manifest);

  return Promise.all(
    map(langs, lang => {
      const items = orderBy(manifest[lang], 'date', 'desc');
      const outPath = path.join(manifestDir, `${lang}.json`);
      return writeFile(outPath, JSON.stringify(items), 'utf8');
    })
  );
});

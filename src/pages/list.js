const path = require('path');
const toLower = require('lodash/toLower');
const forEach = require('lodash/forEach');
const template = require('lodash/template');
const manifests = require('require-all')(path.resolve('dist', 'manifests'));
const { send } = require('micro');
const cache = require('../cache');
const { readFile } = require('../utils');

const listTemplate = path.resolve('src', 'templates', 'list.html');
const listContent = readFile(listTemplate, 'utf8');

module.exports = async (req, res) => {
  const lang = toLower(req.params.lang);
  const props = { lang, manifest: manifests[lang] };
  let data;

  if (cache.has(lang) && process.env.NODE_ENV === 'production') {
    data = cache.get(lang)(props);
  } else {
    const compiled = template(await listContent, { imports: { forEach } });

    data = compiled(props);
    cache.set(lang, compiled);
  }

  return send(res, 200, data);
};

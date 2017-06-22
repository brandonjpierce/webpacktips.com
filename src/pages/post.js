const path = require('path');
const toLower = require('lodash/toLower');
const { send } = require('micro');
const { readFile } = require('../utils');
const notFound = require('./not-found');

module.exports = async (req, res) => {
  const lang = toLower(req.params.lang);
  const file = toLower(req.params.file);
  const filePath = path.resolve('dist', 'pages', lang, `${file}.html`);
  let data;

  try {
    data = await readFile(filePath, 'utf8');
  } catch (err) {
    req.log.error('Markdown file not found', { url: `/${lang}/${file}` });
    return notFound(req, res);
  }

  return send(res, 200, data);
};

const path = require('path');
const marked = require('marked');
const parser = require('front-matter');
const assign = require('lodash/assign');
const toLower = require('lodash/toLower');
const forEach = require('lodash/forEach');
const template = require('lodash/template');
const { send } = require('micro');
const cache = require('../cache');
const { readFile } = require('../utils');
const notFound = require('./not-found');

const postTemplate = path.resolve('src', 'templates', 'post.html');
const postContent = readFile(postTemplate, 'utf8');

module.exports = async (req, res) => {
  const lang = toLower(req.params.lang);
  const file = toLower(req.params.file);
  const filePath = path.resolve('tips', lang, `${file}.md`);
  let fileContent;

  try {
    fileContent = await readFile(filePath, 'utf8');
  } catch (err) {
    req.log.error('Markdown file not found', { url: `/${lang}/${file}` });
    return notFound(req, res);
  }

  const { attributes, body } = parser(fileContent);

  const html = marked(body, {
    gfm: true,
    tables: true,
    breaks: true
  });

  const props = assign({}, attributes, {
    lang,
    file,
    html
  });

  let data;

  if (cache.has(file) && process.env.NODE_ENV === 'production') {
    data = cache.get(file)(props);
  } else {
    const compiled = template(await postContent, { imports: { forEach } });

    data = compiled(props);
    cache.set(file, compiled);
  }

  return send(res, 200, data);
};

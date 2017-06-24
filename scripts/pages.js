const path = require('path');
const del = require('del');
const last = require('lodash/last');
const split = require('lodash/split');
const assign = require('lodash/assign');
const makeDir = require('make-dir');
const marked = require('marked');
const parser = require('front-matter');
const forEach = require('lodash/forEach');
const template = require('lodash/template');
const { walk } = require('walk');
const { minify } = require('html-minifier');
const { readFile, writeFile } = require('../src/utils');

const postTemplate = path.resolve('src', 'templates', 'post.html');
const postContent = readFile(postTemplate, 'utf8');
const tipsDir = path.resolve('tips');
const pagesDir = path.resolve('dist', 'pages');

del([path.join(pagesDir)])
  .then(() => {
    const walker = walk(tipsDir);

    walker.on('file', async (root, stats, next) => {
      const lang = last(split(root, path.sep));
      const file = stats.name.slice(0, -3);
      const filePath = path.join(root, stats.name);
      const directory = path.join(pagesDir, lang);
      const content = await readFile(filePath, 'utf8');
      const { attributes, body } = parser(content);

      const html = marked(body, {
        gfm: true,
        tables: true,
        breaks: true,
      });

      const props = assign({}, attributes, {
        lang,
        file,
        html,
      });

      const compiled = template(await postContent, { imports: { forEach } });

      // Ensure output dir exists
      makeDir(directory)
        .then(() =>
          writeFile(
            path.join(pagesDir, lang, `${file}.html`),
            minify(compiled(props), {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              minifyURLs: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeEmptyElements: true,
              removeOptionalTags: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }),
            'utf8'
          )
        )
        .then(() => next())
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));

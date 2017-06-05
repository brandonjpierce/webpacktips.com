const compose = require('lodash/flowRight');
const compress = require('micro-compress');
const { router, get } = require('microrouter');

const logger = require('./logger');
const trailingSlash = require('./trailing-slash');
const css = require('./pages/css');
const tips = require('./pages/post');
const list = require('./pages/list');
const notFound = require('./pages/not-found');
const langRedirect = require('./pages/lang-redirect');

const routes = router(
  get('/:lang/:file', tips),
  get('/:lang', list),
  get('/style.css', css),
  get('/404', notFound),
  get('/', langRedirect),
  get('/*', notFound)
);

module.exports = compose([trailingSlash, logger, compress])(routes);

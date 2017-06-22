const compose = require('lodash/flowRight');
const compress = require('micro-compress');
const { router, get } = require('microrouter');

// Middleware
const logger = require('./logger');
const trailingSlash = require('./trailing-slash');
const langRedirect = require('./lang-redirect');

// Route handlers
const css = require('./pages/css');
const tips = require('./pages/post');
const list = require('./pages/list');
const notFound = require('./pages/not-found');

const routes = router(
  get('/:lang/:file', tips),
  get('/:lang', list),
  get('/style.css', css),
  get('/404', notFound),
  get('/*', notFound)
);

module.exports = compose([trailingSlash, langRedirect, logger, compress])(
  routes
);

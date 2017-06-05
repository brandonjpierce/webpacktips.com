const endsWith = require('lodash/endsWith');
const redirect = require('micro-redirect');

module.exports = fn => (req, res) => {
  if (endsWith(req.url, '/') && req.url.length > 1) {
    redirect(res, 301, req.url.slice(0, -1));
  }

  return fn(req, res);
};

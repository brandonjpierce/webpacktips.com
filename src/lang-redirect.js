const endsWith = require('lodash/endsWith');
const redirect = require('micro-redirect');

module.exports = fn => (req, res) => {
  if (endsWith(req.url, '/')) {
    redirect(res, 301, '/en');
  }

  return fn(req, res);
};

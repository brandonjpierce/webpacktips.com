const pino = require('pino-http')();

module.exports = fn => (req, res) => {
  pino(req, res);
  return fn(req, res);
};

const path = require('path');
const { send } = require('micro');
const { readFile } = require('../utils');

const template = path.resolve('src', 'assets', 'style.css');
// const css = await readFile(template, 'utf8');

module.exports = async (req, res) => {
  const css = await readFile(template, 'utf8');
  return send(res, 200, css);
};

// module.exports = async (req, res) => send(res, 200, await css);

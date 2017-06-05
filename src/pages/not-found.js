const path = require('path');
const { send } = require('micro');
const { readFile } = require('../utils');

const template = path.resolve('src', 'templates', 'not-found.html');
const notFoundContent = readFile(template, 'utf8');

module.exports = async (req, res) => send(res, 404, await notFoundContent);

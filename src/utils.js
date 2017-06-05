const fs = require('fs');
const pify = require('pify');

exports.readFile = pify(fs.readFile);
exports.writeFile = pify(fs.writeFile);

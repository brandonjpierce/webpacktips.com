module.exports = (req, res) => {
  res.writeHead(301, { Location: '/en' });
  res.end();
};

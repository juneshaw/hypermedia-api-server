const url = require('url')

module.exports = function(req, path = req.path) {
  const query = req.query && req.query.delay ? { delay: req.query.delay } : undefined

  const parts = {
    protocol: req.protocol,
    host: req.get('host'),
    pathname: path,
    query,
  }
  return url.format(parts)
}

const url = require('url')

module.exports = function(req, path = req.path) {
  const query = req.query && req.query.delay ? { delay: req.query.delay } : undefined

  let host, protocol
  if (req.headers && req.headers['x-forwarded-for']) {
    host = url.parse(req.headers['x-forwarded-for']).host
    protocol = url.parse(req.headers['x-forwarded-for']).protocol
  } else {
    host = req.get('host')
    protocol = req.protocol
  }

  const parts = {
    pathname: path,
    protocol,
    host,
    query,
  }
  return url.format(parts)
}

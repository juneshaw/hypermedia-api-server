const url = require('url')

module.exports = function(req, path = req.path) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: path
  })
}

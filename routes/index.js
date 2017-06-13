const express = require('express')
const router = express.Router()
const linker = require('../lib/linker')

router.get('/', (req, res, next) => {
  res.json({
    _links: {
      self: {
        href: linker(req)
      },
      login: {
        href: linker(req, '/api/login')
      },
      people: {
        href: linker(req, '/api/people')
      },
    }
  })
})

module.exports = router

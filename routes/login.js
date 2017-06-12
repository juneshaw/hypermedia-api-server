const express = require('express')
const router = express.Router()
const db = require('../lib/db')
const linker = require('../lib/linker')

function serialize(req, person) {
  return {
    name: person.name,
    _links: {
      self: {
        href: linker(req, `/api/people/${person.id}`)
      }
    }
  }
}

router.post('/login', (req, res, next) => {
  const person = db.people.findByName(req.body.name)
  res.json(serialize(req, person))
})

module.exports = router

const express = require('express')
const router = express.Router()
const db = require('../lib/db')
const linker = require('../lib/linker')

router.get('/people', (req, res, next) => {
  const people = db.people.findAll()
  res.json(serializePeople(req, people))
})

router.get('/people/:id', (req, res, next) => {
  const person = db.people.find(req.params.id)
  res.json(serializePerson(req, person))
})

function serializePeople(req, people) {
  return {
    _links: {
      self: {
        href: linker(req, `/api/people`)
      }
    },
    _embedded: {
      people: people.map(person => serializePerson(req, person))
    }
  }
}

function serializePerson(req, person) {
  return {
    _links: {
      self: {
        href: linker(req, `/api/people/${person.id}`)
      },
      meetings: {
        href: linker(req, `/api/people/${person.id}/meetings`)
      },
    },
    id: person.id,
    name: person.name,
  }
}

module.exports = router

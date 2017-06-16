const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializePeople, serializePerson } = require('./serializers')

router.get('/people', (req, res, next) => {
  const people = db.people.findAll()
  res.json(serializePeople(req, people))
})

router.get('/people/:id', (req, res, next) => {
  const person = db.people.find(req.params.id)
  res.json(serializePerson(req, person))
})

module.exports = router

const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializeMessages, serializeMessage } = require('./serializers')

router.get('/messages', (req, res, next) => {
  const messages = db.messages.findAll()
  res.json(serializeMessages(req, messages))
})

router.get('/messages/:id', (req, res, next) => {
  const message = db.messages.find(req.params.id)
  res.json(serializeMessage(req, message, true))
})

module.exports = router

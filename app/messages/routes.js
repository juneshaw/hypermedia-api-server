const express = require('express')
const router = express.Router()
const db = require('../../lib/db')
const { serializeMessages, serializeMessage } = require('./serializers')

router.get('/messages', (req, res, next) => {
  const messages = db.messages.findAll()

  res.json(serializeMessages(req, messages))
})

module.exports = router

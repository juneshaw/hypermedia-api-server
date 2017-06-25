const db = require('../../lib/db')
const linker = require('../../lib/linker')
const { serializePeople, serializePerson } = require('../people/serializers')

module.exports = {
  serializeMessages,
  serializeMessage,
}

function serializeMessages(req, messages) {
  return {
    _links: {
      self: {
        href: linker(req, `/api/messages`)
      }
    },
    _embedded: {
      messages: messages.map(message => serializeMessage(req, message)),
    }
  }
}

function serializeMessage(req, message, complete = false) {
  const response = {
    _links: {
      self: {
        href: linker(req, `/api/messages/${message.id}`)
      }
    },
    id: message.id,
    subject: message.subject,
    starred: message.starred,
    read: message.read,
    labels: message.labels || [],
  }
  if (complete) {
    response.body = message.body
  }
  return response
}

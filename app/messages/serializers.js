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
      people: getPeople(messages).map(person => serializePerson(req, person)),
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
    sender: {
      id: message.sender_id, ref: linker(req, `/api/people/${message.sender_id}`)
    },
  }
  if (complete) {
    response.content = message.content
  }
  return response
}

function getPeople(messages) {
  return Array.from(
    messages
      .reduce((set, message) => {
        set.add(db.people.find(message.sender_id))
        return set
      }, new Set())
      .values()
  )
}

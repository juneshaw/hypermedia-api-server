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

function serializeMessage(req, message) {
  return {
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
    recipient: {
      id: message.recipient_id, ref: linker(req, `/api/people/${message.recipient_id}`)
    },
  }
}

function getPeople(messages) {
  return Array.from(
    messages
      .reduce((set, message) => {
        set.add(db.people.find(message.sender_id))
        set.add(db.people.find(message.recipient_id))
        return set
      }, new Set())
      .values()
  )
}

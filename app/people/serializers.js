const linker = require('../../lib/linker')

module.exports = {
  serializePeople,
  serializePerson,
}

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

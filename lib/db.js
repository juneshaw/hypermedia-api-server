class Table {
  constructor() {
    this.data = {}
    this.sequence = 0
  }

  insert(attributes) {
    this.sequence += 1
    attributes.id = this.sequence
    this.data[this.sequence] = attributes
    return attributes
  }

  findBy(property, value) {
    return Object.values(this.data)
      .find(record => record[property] === value)
  }

  findAll() {
    return Object.values(this.data)
  }

  find(id) {
    return this.data[id]
  }

  delete(id) {
    delete this.data[id]
  }
}

class PersonTable extends Table {
  findByName(name) {
    return Object.values(this.data)
      .find(person => person.name.toLowerCase().trim() === name.toLowerCase().trim())
  }
}

const db = {
  init() {
    this.people = new PersonTable()
    this.comments = new Table()
    this.meetings = new Table()
  },
}

db.init()
db.people.insert({name: 'Frida Kuvalis'})
db.people.insert({name: 'Demarcus Mayer'})
db.people.insert({name: 'Baron Fisher'})
db.people.insert({name: 'Bridgette Murphy'})

module.exports = db

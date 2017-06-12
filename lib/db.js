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

  delete(id) {
    delete this.data[id]
  }
}

class PersonTable extends Table {
  findByName(name) {
    return Object.values(this.data)
      .find(person => person.name.toLowerCase().trim() === name)
  }
}

const db = {
  init() {
    this.people = new PersonTable()
    this.comments = new Table()
    this.companies = new Table()
  },
}

db.init()
db.people.insert({name: 'Ann'})

module.exports = db

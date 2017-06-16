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

  findAll(ids) {
    if (ids) return ids.map(id => this.data[id])
    return Object.values(this.data)
  }

  find(id) {
    return this.data[id]
  }

  delete(id) {
    delete this.data[id]
  }
}

const db = {
  init() {
    this.people = new Table()
    this.comments = new Table()
    this.meetings = new Table()
    this.messages = new Table()
  },
}

db.init()

const frida = db.people.insert({name: 'Frida Kuvalis'})
const demarcus = db.people.insert({name: 'Demarcus Mayer'})
const baron = db.people.insert({name: 'Baron Fisher'})
const bridgette = db.people.insert({name: 'Bridgette Murphy'})

db.meetings.insert({ person1_id: frida.id, person2_id: demarcus.id, comment: "It was a great meeting.  We learned a lot." })
db.meetings.insert({ person1_id: baron.id, person2_id: frida.id, comment: "Sent over the pricing sheets" })
db.meetings.insert({ person1_id: baron.id, person2_id: bridgette.id, comment: "A great time was had by all" })

module.exports = db

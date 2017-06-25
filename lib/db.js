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

const messages = [
  {
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

messages.forEach(message => db.messages.insert(message))

module.exports = db

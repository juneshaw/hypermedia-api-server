const Table = require('./table')

const db = {
  init() {
    this.people = new Table()
    this.comments = new Table()
    this.meetings = new Table()
    this.messages = new Table()
    this.products = new Table()
    this.items = new Table()
  },
}

db.init()

require('./seeds/crm')(db)
require('./seeds/inbox')(db)
require('./seeds/shopping-cart')(db)

module.exports = db

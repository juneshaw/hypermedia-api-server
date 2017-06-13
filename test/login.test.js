const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect
const db = require('../lib/db')
const app = require('../app')
const url = require('url')

describe("POST /api/login", () => {

  beforeEach(() => db.init())

  it("renders a 200 with the user info if the user has been found (case insensitive)", async () => {
    const person = db.people.insert({name: "Demarcus Mayer"})

    const response = await chai.request(app)
      .post('/api/login')
      .send({ name: 'demarcus mayer  ' })
    const port = url.parse(response.request.url).port

    expect(response).to.have.status(200)
    expect(response).to.be.json
    expect(response.body).to.deep.eq({
      name: 'Demarcus Mayer',
      _links: {
        self: {
          href: `http://127.0.0.1:${port}/api/people/${person.id}`
        }
      }
    })
  })

  it("renders a 200 with the user info if the user has been found (exact match)", async () => {
    const person = db.people.insert({name: "Demarcus Mayer"})

    const response = await chai.request(app)
      .post('/api/login')
      .send({ name: 'Demarcus Mayer' })
    expect(response).to.have.status(200)
  })

  it("renders a 401 if the user was not found", async () => {
    let response
    try {
      response = await chai.request(app)
        .post('/api/login')
        .send({ name: 'demarcus mayer' })
    } catch (e) {
      response = e.response
    }

    const port = url.parse(response.request.url).port

    expect(response).to.have.status(401)
    expect(response).to.be.json
    expect(response.body).to.deep.eq({
      error: "Invalid name"
    })
  })

})

const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect
const db = require('../lib/db')
const app = require('../app')
const url = require('url')

describe("/api/messages", () => {
  describe("GET /api/messages", () => {

    beforeEach(() => db.init())

    it("renders a 200 with the a list of messages", async () => {
      const frida = db.people.insert({name: "Frida Kuvalis"})
      const demarcus = db.people.insert({name: "Demarcus Mayer"})
      const message1 = db.messages.insert({
        sender_id: frida.id,
        recipient_id: demarcus.id,
        subject: 'Hi', body: 'Hello there',
        starred: true,
        read: true,
        labels: ['dev', 'personal'],
      })
      const message2 = db.messages.insert({
        sender_id: demarcus.id,
        recipient_id: frida.id,
        subject: 'Hi again', body: 'Second time',
        starred: false,
        read: false,
        labels: [],
      })

      const response = await chai.request(app).get('/api/messages')
      const port = url.parse(response.request.url).port

      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.deep.eq({
        _links: {
          self: {
            href: `http://127.0.0.1:${port}/api/messages`
          }
        },
        _embedded: {
          messages: [
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/api/messages/${message1.id}`
                },
              },
              id: message1.id,
              subject: 'Hi',
              starred: true,
              read: true,
              labels: ['dev', 'personal'],
              sender: {
                id: frida.id, ref: `http://127.0.0.1:${port}/api/people/${frida.id}`
              },
              recipient: {
                id: demarcus.id, ref: `http://127.0.0.1:${port}/api/people/${demarcus.id}`
              },
            },
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/api/messages/${message2.id}`
                },
              },
              id: message2.id,
              subject: 'Hi again',
              starred: false,
              read: false,
              labels: [],
              sender: {
                id: demarcus.id, ref: `http://127.0.0.1:${port}/api/people/${demarcus.id}`
              },
              recipient: {
                id: frida.id, ref: `http://127.0.0.1:${port}/api/people/${frida.id}`
              },
            },
          ],
          people: [
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/api/people/${frida.id}`,
                },
                meetings: {
                  href: `http://127.0.0.1:${port}/api/people/${frida.id}/meetings`,
                },
              },
              id: frida.id,
              name: frida.name,
            },
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/api/people/${demarcus.id}`,
                },
                meetings: {
                  href: `http://127.0.0.1:${port}/api/people/${demarcus.id}/meetings`,
                },
              },
              id: demarcus.id,
              name: demarcus.name,
            }
          ]
        }
      })
    })
  })

  describe("GET /api/messages/:id", () => {

    beforeEach(() => db.init())

    it("renders a 200 with the a list of messages", async () => {
      const frida = db.people.insert({name: "Frida Kuvalis"})
      const demarcus = db.people.insert({name: "Demarcus Mayer"})
      const message = db.messages.insert({
        sender_id: frida.id,
        recipient_id: demarcus.id,
        subject: 'Hi', body: 'Hello there',
        content: 'Hello there',
        starred: true,
        read: true,
        labels: ['dev', 'personal'],
      })

      const response = await chai.request(app).get(`/api/messages/${message.id}`)
      const port = url.parse(response.request.url).port

      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.deep.eq({
        _links: {
          self: {
            href: `http://127.0.0.1:${port}/api/messages/${message.id}`
          },
        },
        id: message.id,
        subject: 'Hi',
        starred: true,
        read: true,
        labels: ['dev', 'personal'],
        content: 'Hello there',
        sender: {
          id: frida.id, ref: `http://127.0.0.1:${port}/api/people/${frida.id}`
        },
        recipient: {
          id: demarcus.id, ref: `http://127.0.0.1:${port}/api/people/${demarcus.id}`
        },
      })
    })

  })
})

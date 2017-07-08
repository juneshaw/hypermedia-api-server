const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect
const linker = require('../lib/linker')

describe("linker", () => {

    it("adds the delay parameter when it's present", () => {
      const req = {
        path: '/api',
        protocol: 'http',
        get() {
          return 'localhost:8181'
        },
        pathname: '/foobar',
        query: { delay: 500 }
      }

      expect(linker(req)).to.eq('http://localhost:8181/api?delay=500')
    })

    it("ignores other query parameters", () => {
      const req = {
        path: '/api',
        protocol: 'http',
        get() {
          return 'localhost:8181'
        },
        pathname: '/foobar',
        query: { other: 500 }
      }

      expect(linker(req)).to.eq('http://localhost:8181/api')
    })

    it("does not add the delay parameter when it's not present", () => {
      const req = {
        path: '/api',
        protocol: 'http',
        get() {
          return 'localhost:8181'
        },
        pathname: '/foobar',
      }

      expect(linker(req)).to.eq('http://localhost:8181/api')
    })

    it("skips the port if a port didn't come in", () => {
      const req = {
        path: '/api',
        protocol: 'http',
        get() {
          return 'example.com'
        },
        pathname: '/foobar',
      }

      expect(linker(req)).to.eq('http://example.com/api')
    })

})

'use strict'

const supertest = require('supertest')
const server = require('../server')
const request = supertest(server.server)

describe('Given /bad', () => {
  describe('When GET', () => {
    it('Then returns 500 status', async () => {
      const response = await request.get('/bad')
      expect(response.status).toStrictEqual(500)
    })

    it('Then returns correct error object', async () => {
      const response = await request.get('/bad')
      expect(response.body).toStrictEqual(
        {
          error: "you've messed up",
          route: '/bad',
          query: {},
          body: {},
          message: '500/Server Error'
        }
      )
    })
  })
})

'use strict'

const supertest = require('supertest')
const server = require('../server')
const request = supertest(server.server)

describe('Given /iDoNotExist', () => {
  describe('When GET', () => {
    it('Then returns 404 status', async  () => {
      const response = await request.get('/iDoNotExist')
      expect(response.status).toStrictEqual(404)
    })
  })

  describe('When POST', () => {
    it('Then returns 404 status', async  () => {
      const response = await request.post('/iDoNotExist')
      expect(response.status).toStrictEqual(404)
    })
  })
})

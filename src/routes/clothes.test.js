'use strict'

const supertest = require('supertest')
const { db, Clothes } = require('../models')
const server = require('../server')
const mockRequest = supertest(server.server)

beforeAll(async () => {
  await db.sync()
  await Clothes.bulkCreate([
    {
      id: 0,
      name: 'Jeans',
      price: 59.99,
      designer: 'Levi',
      createdAt: new Date('2021-10-04'),
      updatedAt: new Date('2021-10-05'),
    },
    {
      id: 1,
      name: 'Leather Belt',
      price: 380.00,
      designer: 'Gucci',
      createdAt: new Date('2021-10-02'),
      updatedAt: new Date('2021-10-06'),
    }, 
    {
      id: 2,
      name: 'Air Jordan 1 Retro High OG',
      price: 495.00,
      designer: 'Nike',
      createdAt: new Date('2021-10-01'),
      updatedAt: new Date('2021-10-07'),
    }
  ])
})

afterAll(async () => {
  await db.drop()
})

describe('Given /clothes', () => {
  describe('When GET', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/clothes')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(
        [{
          id: 0,
          name: 'Jeans',
          price: 59.99,
          designer: 'Levi',
          createdAt: '2021-10-04T00:00:00.000Z',
          updatedAt: '2021-10-05T00:00:00.000Z'
        },
        {
          id: 1,
          name: 'Leather Belt',
          price: 380,
          designer: 'Gucci',
          createdAt: '2021-10-02T00:00:00.000Z',
          updatedAt: '2021-10-06T00:00:00.000Z'
        },
        {
          id: 2,
          name: 'Air Jordan 1 Retro High OG',
          price: 495,
          designer: 'Nike',
          createdAt: '2021-10-01T00:00:00.000Z',
          updatedAt: '2021-10-07T00:00:00.000Z'
        }]
      )
    })
  })

  describe('When POST', () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        name: 'Chuck Taylors',
        price: 59.95,
        designer: 'Converse'
      }
      const response = await mockRequest.post('/clothes').send(requestBody)
      expect(response.status).toStrictEqual(200)
      expect(response.body.name).toStrictEqual('Chuck Taylors')
      expect(response.body.price).toStrictEqual(59.95)
      expect(response.body.designer).toStrictEqual('Converse')
      expect(response.body.id).toStrictEqual(3)
    })
  })
})

describe('Given /clothes/:id', () => {
  describe('When GET', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/clothes/1')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(
        {
          id: 1,
          name: 'Leather Belt',
          price: 380,
          designer: 'Gucci',
          createdAt: '2021-10-02T00:00:00.000Z',
          updatedAt: '2021-10-06T00:00:00.000Z'
        }
      )
    })
  })

  describe('When PUT', () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        name: 'Submariner Watch',
        price: 14000.00,
        designer: 'Rolex'
      }
      const response = await mockRequest.put('/clothes/1').send(requestBody)
      expect(response.status).toStrictEqual(200)
      expect(response.body.name).toStrictEqual('Submariner Watch')
      expect(response.body.price).toStrictEqual(14000)
      expect(response.body.designer).toStrictEqual('Rolex')
      expect(response.body.id).toStrictEqual(1)
    })
  })

  describe('When DELETE', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.delete('/clothes/1')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(1)
    })
  })
})

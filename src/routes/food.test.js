'use strict'

const supertest = require('supertest')
const { db, Food } = require('../models')
const server = require('../server')
const mockRequest = supertest(server.server)

beforeAll(async () => {
  await db.sync()
  await Food.bulkCreate([
    {
      id: 0,
      name: 'Wagyu Beef',
      price: 69.99,
      inStock: false,
      createdAt: new Date('2021-10-04'),
      updatedAt: new Date('2021-10-05'),
    },
    {
      id: 1,
      name: 'Black Truffle Oil',
      price: 147.99,
      inStock: true,
      createdAt: new Date('2021-10-02'),
      updatedAt: new Date('2021-10-06'),
    }, 
    {
      id: 2,
      name: 'Maitake Mushrooms',
      price: 74.99,
      inStock: true,
      createdAt: new Date('2021-10-01'),
      updatedAt: new Date('2021-10-07'),
    }
  ])
})

afterAll(async () => {
  await db.drop()
})

describe('Given /food', () => {
  describe('When GET', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/food')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(
        [
          {
            id: 0,
            name: 'Wagyu Beef',
            price: 69.99,
            inStock: false,
            createdAt: '2021-10-04T00:00:00.000Z',
            updatedAt: '2021-10-05T00:00:00.000Z'
          },
          {
            id: 1,
            name: 'Black Truffle Oil',
            price: 147.99,
            inStock: true,
            createdAt: '2021-10-02T00:00:00.000Z',
            updatedAt: '2021-10-06T00:00:00.000Z'
          },
          {
            id: 2,
            name: 'Maitake Mushrooms',
            price: 74.99,
            inStock: true,
            createdAt: '2021-10-01T00:00:00.000Z',
            updatedAt: '2021-10-07T00:00:00.000Z'
          }
        ]
      )
    })
  })

  describe('When POST', () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        name: 'Saffron',
        price: 59.95,
        inStock: true
      }
      const response = await mockRequest.post('/food').send(requestBody)
      expect(response.status).toStrictEqual(200)
      expect(response.body.name).toStrictEqual('Saffron')
      expect(response.body.price).toStrictEqual(59.95)
      expect(response.body.inStock).toStrictEqual(true)
      expect(response.body.id).toStrictEqual(3)
    })
  })
})

describe('Given /food/:id', () => {
  describe('When GET', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/food/1')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(
        {
          id: 1,
          name: 'Black Truffle Oil',
          price: 147.99,
          inStock: true,
          createdAt: '2021-10-02T00:00:00.000Z',
          updatedAt: '2021-10-06T00:00:00.000Z'
        },
      )
    })
  })

  describe('When PUT', () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        name: 'Yellow Fin Tuna',
        price: 64.99,
        inStock: false
      }
      const response = await mockRequest.put('/food/1').send(requestBody)
      expect(response.status).toStrictEqual(200)
      expect(response.body.name).toStrictEqual('Yellow Fin Tuna')
      expect(response.body.price).toStrictEqual(64.99)
      expect(response.body.inStock).toStrictEqual(false)
      expect(response.body.id).toStrictEqual(1)
    })
  })

  describe('When DELETE', () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.delete('/food/1')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(1)
    })
  })
})
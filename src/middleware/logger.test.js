'use strict'

const logger = require('../middleware/logger')

describe('Given logger', () => {
  describe('When called', () => {
    it('Then passes to next function', async () => {
      let requestObject = {}
      let responseObject = {};
      let nextFunction = jest.fn();
    
      logger(requestObject, responseObject, nextFunction)
      expect(nextFunction).toHaveBeenCalled()
    })
  })
})

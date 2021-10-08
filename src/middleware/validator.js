'use strict'

// Sends the request through when valid otherwise throws an error
const validator = (req, res, next) => {
  if(!req.param.id) {throw new Error('ID Not Provided')}
  next()
}

module.exports = validator

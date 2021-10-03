'use strict';

// Define Error Handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) { return next(err) }
  res.status(500)
  res.json(
    {
      error: err,
      route: req.path,
      query: req.query,
      body: req.body,
      message: '500/Server Error'
    }
  )
}

module.exports = errorHandler
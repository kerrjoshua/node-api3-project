function logger(req, res, next) {
  const date = new Date()
  console.log(`${req.method} request made to ${req.url} at ${date.toTimeString()}`)
  next()
}

function validateUserId(req, res, next) {
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
}

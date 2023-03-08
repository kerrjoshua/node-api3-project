const User = require('../users/users-model')

function logger(req, res, next) {
  const date = new Date()
  console.log(`${req.method} request made to ${req.url} at ${date.toTimeString()}`)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await User.getById(id);
  if (user) {
    next()
  } else {
    next({status: 404, message: "user not found"})
  }
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

const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  const date = new Date()
  console.log(`${req.method} request made to ${req.url} at ${date.toTimeString()}`)
  next()
}

async function validateUserId(req, res, next) {

  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
      req.user = user;
      next()
    } else {
      next({ status: 404, message: "user not found" })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  const name = req.body.name;
  if (
    name !== undefined &&
    typeof name === 'string' &&
    name.trim().length
  ) {
    next()
  } else {
    next({ status: 400, message: 'missing required name field' })
  }
}

function validatePost(req, res, next) {
  
  const text = req.body.text;
  if (
    text !== undefined &&
    typeof text === 'string' &&
    text.trim().length
  ) {
    next()
  } else {
    next({ status: 400, message: 'missing required text field' })
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}

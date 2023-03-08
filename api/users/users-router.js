const express = require('express');

const User = require('./users-model');
const Post = require('../posts/posts-model')
const { validateUserId, validateUser } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      if (users.length) {
        res.status(200).json(users)
      }
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await User.insert({ name: req.body.name });
    res.status(201).json(newUser)

  } catch (err) {
    next(err)
  }
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: `Something went wrong inside the Users router`
  });
})

// do not forget to export the router
module.exports = router

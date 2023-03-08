const express = require('express');

const User = require('./users-model');
const Post = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

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

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => { 
  const post = {user_id: req.params.id, text: req.body.text}
  Post.insert(post)
    .then(insertedPost => {
      res.status(201).json(insertedPost)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: `Something went wrong inside the Users router`
  });
})

// do not forget to export the router
module.exports = router

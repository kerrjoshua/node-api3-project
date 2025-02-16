const express = require('express');
const { logger } = require('./middleware/middleware')
const userRoutes = require('./users/users-router')

const server = express();

server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', userRoutes)



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

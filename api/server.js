const express = require('express');
const { logger } = require('./middleware/middleware')
const user = require('./users/users-router')

const server = express();

server.use(express.json())

// global middlewares and the user's router need to be connected here


server.use(logger);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

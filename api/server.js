const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);
 
const usersRouter = require('../users/usersRouter');
const authRouter = require('../auth/auth-Router');
const knexConnection = require('../database/dbConfig.js');

const server = express();

// session configuration for making sessions and adding peanut butter cookies
const sessionOps = {
    name: 'quietnoise',
    secret: process.env.COOKIE_QUEST || 'hush',
    cookie: {
        secure: process.env.COOKIE_SECURE || false, 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new SessionStore({
        knex: knexConnection,
        createTable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};

// global middleware and route handler
server.use(helmet());
server.use(express.json());
server.use(session(sessionOps));

server.use('/api', usersRouter);
server.use('/api/restrict', authRouter);

server.get('/users', (req, res) => {
    res.json({ api: 'up', session: req.session });
});

module.exports = server;
const express = require('express');

const queries = require('./queries');
const router = express.Router();

const restrict = require('../auth/restrict');



router.get('/users', restrict, (req, res) => {
    queries.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "You shall not pass!!!"});
     })
}) 

module.exports = router; 


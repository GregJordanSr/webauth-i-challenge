const express = require('express');

const queries = require('./queries');

const router = express.Router();


router.get('/api/users', (req, res) => {
    
    queries
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error retrieving the users" });
    })
}) 
module.exports = router; 
const express = require('express');

const queries = require('./queries');

const bcrypt = require('bcryptjs');
const auth = require('../auth/restrict');

const router = express.Router();


router.get('/users', restrict, (req, res) => {
    console.log(req.body)
    queries
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "You shall not pass!!!"});
    })
}) 
module.exports = router; 

router.post('/login', restrict, (req, res) => {
    const { username, password } = req.body;

    queries
        .findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: ` ${user.username} is logged in!!!`});
            } else {
                res.status(401).json({ message: 'You shall not pass'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error with the server"});
        })

})

router.post('/register', restrict, (req, res) => {
    const newUser = req.body;
    
    const hash = bcrypt.hashSync(newUser.password);
    newUser.password = hash;

    queries.addUsers(newUser)
        .then(addedUser => {
            res.status(201).json(addedUser);
        }) 
        .catch(err => {
            res.status(500).json(err);
        })
})
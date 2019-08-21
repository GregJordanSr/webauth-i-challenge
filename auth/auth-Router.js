const router = require('express').Router();
const bcrypt = require('bcryptjs');

const queries = require('../users/queries');

// endpoints for routes beginning with /api/restricted
router.post('/register', (req, res) => {
    let newUser = req.body;
    console.log(req.body, "register")
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;

    queries.addUsers(newUser)
        .then(addedUser => {
            res.status(201).json(addedUser);
        }) 
        .catch(err => {
            res.status(500).json(err);
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    queries.findByUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                req.session.uid = user.id;
                res.status(200).json({ message: ` ${user.username} is logged in!!!`});
            } else {
                res.status(401).json({ message: 'You shall not pass'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error with the server"});
        })

})

router.get('/logged-in', (req, res) => {
    const id = req.session.uid;
    
    if (id) {
        queries.findLoggedIn(id)
            .then(user =>{
                res.status(200).json(user)
            })
                
    } else {
        res.status(401).json({ message: 'Your not logged in!!!'})
    }
})

// logout for the user
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You have logged out successfully.' });
    });
  });

  module.exports = router;
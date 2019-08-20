const bcrypt = require('bcryptjs');

const queries = require('../users/queries');

 
function restrict(req, res, next) {
    const {username, password } = req.headers;
    console.log(username, password, "restrict")
    if (username && password) {
        queries
            .findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: "You shall not pass!!!"});
                }
            })
            .catch(err => {
                (500).json({ message: "Unexpected error"})
            })
    } else {
        res.status(400).json({ message: "Provide credentials"});
    }
}
module.exports = restrict;
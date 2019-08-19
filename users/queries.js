const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findBy,
    addUsers
}

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(user) {
    return db('users').where(user);
}

function addUsers(user) {
   return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [user] = ids;
        return findById(id);
    })

}
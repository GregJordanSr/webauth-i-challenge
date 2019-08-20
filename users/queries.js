const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findBy,
    addUsers
}

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(id) {
    return db('users')
    .where({id})
    .first();
}

function addUsers(user) {
   return db('users')
    .insert(user)
    .then(ids => {
        console.log(ids)
        const [id] = ids;
        return findBy(id);
    })

}



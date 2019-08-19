
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments();

      users
        .string('username', 255)
        .notNullable()
        .unique();
    users
        .string('password', 128)
        .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('users')
};

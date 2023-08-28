/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('students', table => {
    table.increments('matriculation').primary()
    table.string('name').notNull()
    table.enum('shift',['matutinal', 'vespertine', 'nocturnal']).notNull()
    table.enum('stage',['high school', 'elementary School']).notNull()

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('students')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('students', table => {
    table.increments('id').primary()
    table.string('matriculation').notNull()
    table.string('name').notNull()
    table.string('cpf').unique().notNull()
    table.string('phoneNumber').notNull()
    table.string('observation', 1000)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('students')
};

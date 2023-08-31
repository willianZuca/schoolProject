const config = require('../knexfile.js')
const knex = require('knex')(config)

/*knex.migrate.latest([config]) Da B.O. quando cria novas migrates.*/
module.exports = knex
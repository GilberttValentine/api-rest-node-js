const knex = require('knex');

module.exports = knex({
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/bank', //user, password, host, port, bd
    pool: { min: 1, max: 2 },
    acquireConnection: 5000
});
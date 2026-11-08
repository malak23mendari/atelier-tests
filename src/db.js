const { Pool } = require('pg');

module.exports = new Pool({
    connectionString:
        process.env.DATABASE_URL ||
        'postgres://test:test@localhost:5432/testdb'
});
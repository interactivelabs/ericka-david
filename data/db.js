const Pool = require("pg").Pool;

let pool;
const connectionString =
  process.env.DATABASE_URL || "postgresql://localhost:5432/ericka";

if (!pool) {
  pool = new Pool({ connectionString });
}

module.exports = (sql, params) => pool.query(sql, params);

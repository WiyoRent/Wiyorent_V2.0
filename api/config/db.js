import pkg from 'pg'
import "dotenv/config"

const {Pool} = pkg

// Shared connection pool used by every controller's pool.query(...) call
const pool = new Pool({
    connectionString : process.env.DATABASE_URL
})

export default pool
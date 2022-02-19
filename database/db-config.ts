import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sklep_XYZ',
  password: 'admin2299',
  port: 5432
})

export default pool

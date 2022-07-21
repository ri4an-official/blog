import pg from 'pg'

const pool = new pg.Pool({
    user: 'postgres',
    password: 'VadimGuber_2003',
    host: 'localhost',
    port: 5432,
    database: 'blog',
})

export default pool

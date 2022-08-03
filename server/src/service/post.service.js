import pool from '../db.js'

class PostService {
    create = async (text, date, user_id) => {
        const query =
            'INSERT INTO post (text,date,user_id) VALUES ($1,$2,$3) RETURNING *'
        const result = await pool.query(query, [text, date, user_id])
        const post = result.rows[0]
        return post
    }

    update = async (author_id, text, date) => {
        const query = 'UPDATE post SET text=$1,date=$2 WHERE author_id=$3'
        const result = await pool.query(query, [text, date, author_id])
        const post = result.rows[0]
        return post
    }

    getAll = async () => {
        const query = 'SELECT * FROM post'
        const result = await pool.query(query)
        const posts = result.rows
        return posts
    }

    getUserPosts = async (author_id) => {
        const query = 'SELECT * FROM post WHERE author_id=$1'
        const result = await pool.query(query, [author_id])
        const posts = result.rows
        return posts
    }

    get = async (id) => {
        const query = 'SELECT * FROM post WHERE id=$1'
        const result = await pool.query(query, [id])
        const post = result.rows[0]
        return post
    }

    delete = async () => {}
}
export default new PostService()

export const BASE_URL =
    process.env.ENV !== 'production' ? 'localhost:8080/api/v1' : ''

export const Tokens = {
    Access: 'X-Access',
    Refresh: 'X-Refresh',
}

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

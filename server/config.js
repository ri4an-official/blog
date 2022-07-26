export const PORT = 8080,
	BASE_URL = '/api/v1',
	SALT = 3

export const CORS = {
	origin: '*',
}

export const Status = {
	OK: 200,
	NOT_AUTH: 401,
	UNSET: 422,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
}
export const Tokens = {
	Access: 'X-Access',
	Refresh: 'X-Refresh',
}

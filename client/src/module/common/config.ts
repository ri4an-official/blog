export const BASE_URL =
	process.env.ENV !== 'production' ? 'http://localhost:8080/api/v1' : ''

export enum Tokens {
	Access = 'X-Access',
	Refresh = 'X-Refresh',
}

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export enum Status {
	OK = 200,
	UN_AUTH = 401,
	NOT_FOUND = 404,
	SERVER_ERROR = 500,
}

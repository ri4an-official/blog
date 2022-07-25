import { BASE_URL } from './../../common/config'
export const userConfig = {
	GET: `${BASE_URL}/oauth/user`,
	LOGIN: `${BASE_URL}/oauth/login`,
	REGISTER: `${BASE_URL}/oauth/register`,
	CHECK: `${BASE_URL}/oauth/check`,
	REFRESH: `${BASE_URL}/oauth/refresh`,
	LOGOUT: `${BASE_URL}/oauth/logout`,
}

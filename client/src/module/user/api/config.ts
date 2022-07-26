import { UserDone, UserError, UserResponse } from './../types/Response.type'
import { BASE_URL, HttpStatus, Tokens } from './../../common/config'
import { mapToCamelCase } from '../../common/helpers'
import { IUserData } from '../types/User.type'

export const userConfig = {
	GET: `${BASE_URL}/oauth/user`,
	LOGIN: `${BASE_URL}/oauth/login`,
	REGISTER: `${BASE_URL}/oauth/register`,
	CHECK: `${BASE_URL}/oauth/check`,
	REFRESH: `${BASE_URL}/oauth/refresh`,
	LOGOUT: `${BASE_URL}/oauth/logout`,
}

export const handleUserResponse = async (res: Response): Promise<UserResponse> => {
	const status = res.status
	if (status !== HttpStatus.OK) {
		const userError: UserError = await res.json()
		return { ...userError, status } as UserError
	}

	const accessToken = res.headers.get(Tokens.Access)
	const refreshToken = res.headers.get(Tokens.Refresh)
	const user: IUserData = await res.json()

	if (!accessToken || !refreshToken) return { user, status }

	const userData: UserDone = {
		tokens: { accessToken, refreshToken },
		user,
		status,
	}

	return mapToCamelCase(userData)
}

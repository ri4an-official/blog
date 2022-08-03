import { UserDone, UserFail, UserResponse } from 'entities/user/types/Response.type'
import { IUserData } from 'entities/user/types/User.type'
import { postRoutes } from 'features/post/api/config'
import { BASE_URL, Status, Tokens } from 'shared/lib/config'

export const authRoutes = {
	GET: `${BASE_URL}/oauth/user`,
	LOGIN: `${BASE_URL}/oauth/login`,
	REGISTER: `${BASE_URL}/oauth/register`,
	CHECK: `${BASE_URL}/oauth/check`,
	REFRESH: `${BASE_URL}/oauth/refresh`,
	LOGOUT: `${BASE_URL}/oauth/logout`,
}

export const privateRoutes = [
	postRoutes.GET_ALL,
	authRoutes.CHECK,
	authRoutes.LOGOUT,
]

export const handleUserResponse = async (res: Response): Promise<UserResponse> => {
	const status = res.status
	if (status !== Status.OK) {
		const userError: UserFail = await res.json()
		return { ...userError, status } as UserFail
	}

	const accessToken = res.headers.get(Tokens.Access)
	const refreshToken = res.headers.get(Tokens.Refresh)
	const user: IUserData = await res.json()

	if (!accessToken || !refreshToken) {
		const checkUser = { user, status }
		return checkUser
	}

	const userData: UserDone = {
		tokens: { accessToken, refreshToken },
		user,
		status,
	}

	return userData
}

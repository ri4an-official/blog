import { HttpMethod, Tokens } from './../../common/config'
import { userConfig } from './config'
import { fetchExtended, mapToCamelCase } from '../../common/helpers'
import { IUser, UserData } from '../types/User.type'

class UserService {
	async getUser(id: number) {
		const response = await fetchExtended(userConfig.GET + id)
		const user: IUser = await response.json()

		return mapToCamelCase(user)
	}

	async check(accessToken: string) {
		const response = await fetchExtended(userConfig.CHECK, HttpMethod.GET, {
			[Tokens.Access]: accessToken,
		})

		return response.status
	}

	async refresh(refresh: string) {
		const response = await fetchExtended(userConfig.REFRESH, HttpMethod.POST, {
			[Tokens.Refresh]: refresh,
		})

		const accessToken = response.headers.get(Tokens.Access)
		const refreshToken = response.headers.get(Tokens.Refresh)
		const user: IUser = await response.json()

		const result: UserData = {
			tokens: { accessToken, refreshToken },
			user,
		}

		return result
	}

	async login(userParam: IUser) {
		const response = await fetchExtended(userConfig.LOGIN, HttpMethod.POST, {
			...userParam,
		})

		const accessToken = response.headers.get(Tokens.Access)
		const refreshToken = response.headers.get(Tokens.Refresh)
		const user: IUser = await response.json()

		const result: UserData = {
			tokens: { accessToken, refreshToken },
			user,
		}

		return result
	}
}
export default new UserService()

import { HttpMethod, Tokens } from './../../common/config'
import { handleUserResponse, userConfig } from './config'
import { fetchExtended } from '../../common/helpers'
import { IUserData } from '../types/User.type'

class UserService {
	async getUser(id: number) {
		const response = await fetchExtended(userConfig.GET + id)

		return handleUserResponse(response)
	}

	async check(accessToken: string) {
		const response = await fetchExtended(userConfig.CHECK, HttpMethod.GET, {
			[Tokens.Access]: accessToken,
		})

		return handleUserResponse(response)
	}

	async refresh(refresh: string) {
		const response = await fetchExtended(userConfig.REFRESH, HttpMethod.POST, {
			[Tokens.Refresh]: refresh,
		})

		return handleUserResponse(response)
	}

	async login(userParam: IUserData) {
		const response = await fetchExtended(userConfig.LOGIN, HttpMethod.POST, {
			...userParam,
		})

		return handleUserResponse(response)
	}
}
export default new UserService()

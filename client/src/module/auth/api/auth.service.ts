import { HttpMethod, Tokens } from '../../common/config'
import { fetchExtended } from '../../common/helpers'
import { IUserData } from '../types/User.type'
import { handleUserResponse, userConfig } from './config'

class AuthService {
	async getUser(id: number) {
		const response = await fetchExtended(userConfig.GET + id)

		return handleUserResponse(response)
	}

	async check(accessToken: string) {
		const response = await fetchExtended(userConfig.CHECK, HttpMethod.GET)

		return handleUserResponse(response)
	}

	async refresh(refresh: string) {
		const response = await fetchExtended(
			userConfig.REFRESH,
			HttpMethod.POST,
			null,
			{
				[Tokens.Refresh]: refresh,
			}
		)

		return handleUserResponse(response)
	}

	async login(userParams: IUserData) {
		const response = await fetchExtended(userConfig.LOGIN, HttpMethod.POST, {
			...userParams,
		})

		return handleUserResponse(response)
	}
}
export default new AuthService()

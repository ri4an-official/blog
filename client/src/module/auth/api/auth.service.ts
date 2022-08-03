import { Method, Tokens } from '../../common/config'
import { fetchExtended } from '../../common/helpers'
import storage from '../../common/storage'
import { IUserData } from '../types/User.type'
import { authRoutes, handleUserResponse } from './config'

class AuthService {
	async getUser(id: number) {
		const response = await fetchExtended(authRoutes.GET + id)

		return handleUserResponse(response)
	}

	async check() {
		const response = await fetchExtended(authRoutes.CHECK, Method.GET)

		return handleUserResponse(response)
	}

	async refresh() {
		const refresh = storage.getRefresh()
		const response = await fetchExtended(authRoutes.REFRESH, Method.POST, null, {
			[Tokens.Refresh]: refresh,
		})

		return handleUserResponse(response)
	}

	async login(userParams: IUserData) {
		const response = await fetchExtended(
			authRoutes.LOGIN,
			Method.POST,
			userParams
		)

		return handleUserResponse(response)
	}
}
export default new AuthService()

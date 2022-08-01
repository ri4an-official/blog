import { Tokens } from './config'
import { ITokens } from '../auth/types/User.type'

class Storage {
	set = (name: string, token?: string | null) =>
		localStorage.setItem(name, token ?? '')

	get = (name: string) => localStorage.getItem(name) ?? ''

	saveTokens = (tokens?: ITokens) => {
		if (!tokens) return false
		this.set(Tokens.Access, tokens.accessToken)
		this.set(Tokens.Refresh, tokens.refreshToken)
		return true
	}
}
export default new Storage()

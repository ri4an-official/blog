import { ITokens } from 'entity/user'
import { Tokens } from 'shared/lib/http'
class Storage {
	set = (name: string, token?: string | null) =>
		localStorage.setItem(name, token ?? '')

	get = (name: string) => localStorage.getItem(name) ?? ''
	getAccess = () => localStorage.getItem(Tokens.Access) ?? ''
	getRefresh = () => localStorage.getItem(Tokens.Refresh) ?? ''

	saveTokens = (tokens?: ITokens) => {
		if (!tokens) return false
		this.set(Tokens.Access, tokens.accessToken)
		this.set(Tokens.Refresh, tokens.refreshToken)
		return true
	}

	clear = () => {
		localStorage.removeItem(Tokens.Access)
		localStorage.removeItem(Tokens.Refresh)
	}
}
export default new Storage()

import { Tokens } from './config'
import storage from './storage'

export const fetchExtended = async (
	url: string,
	method = 'GET',
	body: any = null,
	headers = { 'Content-Type': 'application/json' }
): Promise<Response> => {
	const accessToken = storage.get(Tokens.Access)

	if (accessToken)
		headers = {
			...headers,
			[Tokens.Access]: accessToken,
		}

	const response = await fetch(url, { body, method, headers })

	return response
}

export const mapToCamelCase = <T extends Object>(obj: T): T => {
	const toCamelCase = (str: string) =>
		str
			.toLowerCase()
			.split('')
			.map((s, i, str) => {
				if (s !== '_' && s !== '-') return s
				str.splice(i, 1)
				return str[i].toUpperCase()
			})
			.join('')

	return Object.entries(obj).reduce(
		(acc, [key, value]) => ({ ...acc, [toCamelCase(key)]: value }),
		{}
	) as T
}

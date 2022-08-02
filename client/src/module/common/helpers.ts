import { Tokens } from './config'
import storage from './storage'

export async function fetchExtended(
	url: string,
	method = 'GET',
	body: any = null,
	headers: any = { 'Content-Type': 'application/json' }
) {
	const accessToken = storage.get(Tokens.Access)

	if (accessToken)
		headers = {
			...headers,
			[Tokens.Access]: accessToken,
		}

	const options = body
		? {
				method,
				headers,
				body: JSON.stringify(body),
		  }
		: { method, headers }

	const res = await fetch(url, options)

	return res
}

export function mapToCamelCase<T extends Object>(obj: T): T {
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

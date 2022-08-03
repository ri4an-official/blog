import { privateRoutes } from 'features/auth/api/config'
import { Tokens } from 'shared/lib/config'
import storage from './storage'

export async function fetchExtended(
	url: string,
	method = 'GET',
	body: any = null,
	headers: Record<string, string> = {}
) {
	let initHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
	}
	if (privateRoutes.includes(url))
		initHeaders = { ...initHeaders, [Tokens.Access]: storage.getAccess() }

	headers = { ...headers, ...initHeaders }
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

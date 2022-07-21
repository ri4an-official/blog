import { Tokens } from './config'
import storage from './storage'

export const fetchExtended = (
    url: string,
    method = 'GET',
    body: any = {},
    headers = { 'Content-Type': 'application/json' }
) => {
    const accessToken = storage.get(Tokens.Access)

    if (accessToken)
        headers = {
            ...headers,
            [Tokens.Access]: accessToken,
        }
    return fetch(url, { body, method, headers })
}

export const mapToCamelCase = <T extends Object>(obj: T): T => {
    const toCamelCase = (str: any) =>
        [...str.toLowerCase()]
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

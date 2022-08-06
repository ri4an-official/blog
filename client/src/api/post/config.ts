import { IPost, IPostError } from 'entity/post'
import { BASE_URL } from 'shared/lib/http'

export const postRoutes = {
	GET_ALL: `${BASE_URL}/posts`,
	CREATE: `${BASE_URL}/posts`,
	UPDATE: `${BASE_URL}/posts`,
}
export const handlePostResponse = async <T = IPost>(response: Response) => {
	const json: T | IPostError = await response.json()
	return json
}
